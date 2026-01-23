import { describe, it, expect } from 'vitest';
import { validateConfig } from './loader';
import { defaultConfig } from './schema';
import type { ShowcaseConfig } from './schema';

describe('Config loader', () => {
  describe('validateConfig', () => {
    it('should validate a valid config', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        port: 6060,
        outDir: './showcase-dist',
      };

      const result = validateConfig(config);

      expect(result.showcasePaths).toEqual(['src/**/*.showcase.tsx']);
      expect(result.port).toBe(6060);
      expect(result.outDir).toBe('./showcase-dist');
    });

    it('should merge with default config', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
      };

      const result = validateConfig(config);

      expect(result.port).toBe(defaultConfig.port);
      expect(result.outDir).toBe(defaultConfig.outDir);
      expect(result.exclude).toEqual(defaultConfig.exclude);
    });

    it('should throw error for missing showcasePaths', () => {
      const config = {
        port: 6060,
      };

      expect(() => validateConfig(config)).toThrow();
    });

    it('should throw error for empty showcasePaths array', () => {
      const config = {
        showcasePaths: [],
      };

      expect(() => validateConfig(config)).toThrow('At least one showcase path is required');
    });

    it('should validate port number range', () => {
      const validConfig = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        port: 3000,
      };

      expect(() => validateConfig(validConfig)).not.toThrow();

      const invalidConfigLow = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        port: 0,
      };

      expect(() => validateConfig(invalidConfigLow)).toThrow();

      const invalidConfigHigh = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        port: 65536,
      };

      expect(() => validateConfig(invalidConfigHigh)).toThrow();
    });

    it('should accept valid port at boundaries', () => {
      const configMin = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        port: 1,
      };

      expect(() => validateConfig(configMin)).not.toThrow();

      const configMax = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        port: 65535,
      };

      expect(() => validateConfig(configMax)).not.toThrow();
    });

    it('should validate globalCss as optional string', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        globalCss: './src/index.css',
      };

      const result = validateConfig(config);

      expect(result.globalCss).toBe('./src/index.css');
    });

    it('should validate globalProvider as optional string', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        globalProvider: './src/provider.tsx',
      };

      const result = validateConfig(config);

      expect(result.globalProvider).toBe('./src/provider.tsx');
    });

    it('should validate exclude patterns', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        exclude: ['**/node_modules/**', '**/*.test.*'],
      };

      const result = validateConfig(config);

      expect(result.exclude).toEqual(['**/node_modules/**', '**/*.test.*']);
    });

    it('should accept multiple showcase paths', () => {
      const config = {
        showcasePaths: [
          'src/**/*.showcase.tsx',
          'components/**/*.showcase.tsx',
          'lib/**/*.showcase.tsx',
        ],
      };

      const result = validateConfig(config);

      expect(result.showcasePaths).toHaveLength(3);
      expect(result.showcasePaths).toContain('src/**/*.showcase.tsx');
      expect(result.showcasePaths).toContain('components/**/*.showcase.tsx');
      expect(result.showcasePaths).toContain('lib/**/*.showcase.tsx');
    });

    it('should reject non-integer ports', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        port: 3000.5,
      };

      expect(() => validateConfig(config)).toThrow();
    });

    it('should handle config with all optional fields', () => {
      const config: Partial<ShowcaseConfig> = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        globalCss: './src/global.css',
        globalProvider: './src/provider.tsx',
        port: 8080,
        outDir: './build',
        exclude: ['**/test/**'],
      };

      const result = validateConfig(config);

      expect(result.showcasePaths).toEqual(['src/**/*.showcase.tsx']);
      expect(result.globalCss).toBe('./src/global.css');
      expect(result.globalProvider).toBe('./src/provider.tsx');
      expect(result.port).toBe(8080);
      expect(result.outDir).toBe('./build');
      expect(result.exclude).toEqual(['**/test/**']);
    });

    it('should override default exclude patterns if provided', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        exclude: ['**/custom/**'],
      };

      const result = validateConfig(config);

      expect(result.exclude).toEqual(['**/custom/**']);
      expect(result.exclude).not.toEqual(defaultConfig.exclude);
    });

    it('should throw error for invalid config types', () => {
      const invalidConfig = {
        showcasePaths: 'not-an-array', // Should be array
      };

      expect(() => validateConfig(invalidConfig)).toThrow();
    });

    it('should throw error for invalid outDir type', () => {
      const invalidConfig = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        outDir: 123, // Should be string
      };

      expect(() => validateConfig(invalidConfig)).toThrow();
    });

    it('should handle empty exclude array', () => {
      const config = {
        showcasePaths: ['src/**/*.showcase.tsx'],
        exclude: [],
      };

      const result = validateConfig(config);

      expect(result.exclude).toEqual([]);
    });
  });

  describe('Default config', () => {
    it('should have correct default values', () => {
      expect(defaultConfig.port).toBe(6060);
      expect(defaultConfig.outDir).toBe('./showcase-dist');
      expect(defaultConfig.exclude).toEqual([
        '**/node_modules/**',
        '**/.git/**',
        '**/*.test.*',
      ]);
    });

    it('should not have showcasePaths in defaults', () => {
      expect(defaultConfig.showcasePaths).toBeUndefined();
    });

    it('should not have required fields in defaults', () => {
      expect(defaultConfig.globalCss).toBeUndefined();
      expect(defaultConfig.globalProvider).toBeUndefined();
    });
  });
});
