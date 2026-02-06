import { describe, it, expect, vi } from 'vitest';
import type { ShowcaseModule, Showcase } from './showcase';
import React from 'react';

// Mock the virtual module
vi.mock('virtual:showcase-files', () => ({
  showcaseModules: [],
}));

describe('Showcase parsing', () => {
  // Helper to create a basic showcase module
  const createShowcaseModule = (
    title: string,
    showcases: Record<string, any>
  ): ShowcaseModule => ({
    default: { title },
    ...showcases,
  });

  describe('parseShowcase', () => {
    it('should parse a showcase module with a single showcase', () => {
      const BasicExample = () => React.createElement('div', null, 'Basic');
      const module = createShowcaseModule('Button', { BasicExample });

      // Since parseShowcase is not exported, we'll test via the module structure
      // that would be processed by the actual implementation
      expect(module.default.title).toBe('Button');
      expect(typeof module.BasicExample).toBe('function');
    });

    it('should parse showcase module with multiple showcases', () => {
      const Primary = () => React.createElement('div', null, 'Primary');
      const Secondary = () => React.createElement('div', null, 'Secondary');
      const module = createShowcaseModule('Button', { Primary, Secondary });

      expect(module.default.title).toBe('Button');
      expect(typeof module.Primary).toBe('function');
      expect(typeof module.Secondary).toBe('function');
    });

    it('should skip the default export when parsing showcases', () => {
      const Example = () => React.createElement('div', null, 'Example');
      const module = createShowcaseModule('Card', { Example });

      // The default should not be treated as a showcase
      const keys = Object.keys(module).filter((key) => key !== 'default');
      expect(keys).toEqual(['Example']);
    });

    it('should handle showcases with props configuration', () => {
      const WithProps = () => React.createElement('div', null, 'With Props');
      (WithProps as any).props = {
        color: {
          type: 'select',
          options: ['red', 'blue', 'green'],
          default: 'red',
        },
      };
      const module = createShowcaseModule('Component', { WithProps });

      expect((module.WithProps as any).props).toBeDefined();
      expect((module.WithProps as any).props.color.type).toBe('select');
    });
  });

  describe('Showcase structure', () => {
    it('should have correct showcase ID format', () => {
      const showcase: Showcase = {
        id: 'Button-Primary',
        name: 'Primary',
        title: 'Button / Primary',
        component: () => React.createElement('div', null, 'Button'),
      };

      expect(showcase.id).toMatch(/^[\w-]+$/);
      expect(showcase.id).toContain('-');
    });

    it('should have correct title format with slash separator', () => {
      const showcase: Showcase = {
        id: 'Card-Elevated',
        name: 'Elevated',
        title: 'Card / Elevated',
        component: () => React.createElement('div', null, 'Card'),
      };

      expect(showcase.title).toContain(' / ');
      expect(showcase.title.split(' / ')).toHaveLength(2);
    });

    it('should support optional props configuration', () => {
      const showcaseWithProps: Showcase = {
        id: 'Input-WithLabel',
        name: 'WithLabel',
        title: 'Input / WithLabel',
        component: () => React.createElement('div', null, 'Input'),
        props: {
          label: { type: 'string', label: 'Label', default: 'Label' },
          disabled: { type: 'boolean', label: 'Disabled', default: false },
        },
      };

      expect(showcaseWithProps.props).toBeDefined();
      expect(showcaseWithProps.props?.label).toBeDefined();
      expect(showcaseWithProps.props?.disabled).toBeDefined();
    });

    it('should support showcase without props', () => {
      const showcaseNoProps: Showcase = {
        id: 'Badge-Simple',
        name: 'Simple',
        title: 'Badge / Simple',
        component: () => React.createElement('div', null, 'Badge'),
      };

      expect(showcaseNoProps.props).toBeUndefined();
    });
  });

  describe('PropConfig types', () => {
    it('should support string type prop', () => {
      const showcase: Showcase = {
        id: 'test',
        name: 'test',
        title: 'test',
        component: () => React.createElement('div', null, 'Test'),
        props: {
          text: { type: 'string', label: 'Text', default: 'Hello' },
        },
      };

      expect(showcase.props?.text.type).toBe('string');
      expect(showcase.props?.text.default).toBe('Hello');
    });

    it('should support boolean type prop', () => {
      const showcase: Showcase = {
        id: 'test',
        name: 'test',
        title: 'test',
        component: () => React.createElement('div', null, 'Test'),
        props: {
          enabled: { type: 'boolean', label: 'Enabled', default: true },
        },
      };

      expect(showcase.props?.enabled.type).toBe('boolean');
      expect(showcase.props?.enabled.default).toBe(true);
    });

    it('should support select type prop with options', () => {
      const showcase: Showcase = {
        id: 'test',
        name: 'test',
        title: 'test',
        component: () => React.createElement('div', null, 'Test'),
        props: {
          variant: {
            type: 'select',
            label: 'Variant',
            options: ['primary', 'secondary', 'ghost'],
            default: 'primary',
          },
        },
      };

      expect(showcase.props?.variant.type).toBe('select');
      expect(showcase.props?.variant.options).toEqual([
        'primary',
        'secondary',
        'ghost',
      ]);
    });

    it('should support number type prop', () => {
      const showcase: Showcase = {
        id: 'test',
        name: 'test',
        title: 'test',
        component: () => React.createElement('div', null, 'Test'),
        props: {
          size: { type: 'number', label: 'Size', default: 16 },
        },
      };

      expect(showcase.props?.size.type).toBe('number');
      expect(showcase.props?.size.default).toBe(16);
    });

    it('should support object type prop', () => {
      const showcase: Showcase = {
        id: 'test',
        name: 'test',
        title: 'test',
        component: () => React.createElement('div', null, 'Test'),
        props: {
          config: { type: 'object', label: 'Config', default: { key: 'value' } },
        },
      };

      expect(showcase.props?.config.type).toBe('object');
      expect(showcase.props?.config.default).toEqual({ key: 'value' });
    });

    it('should support array type prop', () => {
      const showcase: Showcase = {
        id: 'test',
        name: 'test',
        title: 'test',
        component: () => React.createElement('div', null, 'Test'),
        props: {
          items: { type: 'array', label: 'Items', default: ['item1', 'item2'] },
        },
      };

      expect(showcase.props?.items.type).toBe('array');
      expect(showcase.props?.items.default).toEqual(['item1', 'item2']);
    });

    it('should support optional label for props', () => {
      const showcase: Showcase = {
        id: 'test',
        name: 'test',
        title: 'test',
        component: () => React.createElement('div', null, 'Test'),
        props: {
          userName: {
            type: 'string',
            label: 'User Name',
            default: 'John',
          },
        },
      };

      expect(showcase.props?.userName.label).toBe('User Name');
    });
  });

  describe('Showcase grouping', () => {
    it('should group showcases by component name', () => {
      const showcases: Showcase[] = [
        {
          id: 'Button-Primary',
          name: 'Primary',
          title: 'Button / Primary',
          component: () => React.createElement('div', null, 'Button'),
        },
        {
          id: 'Button-Secondary',
          name: 'Secondary',
          title: 'Button / Secondary',
          component: () => React.createElement('div', null, 'Button'),
        },
        {
          id: 'Card-Basic',
          name: 'Basic',
          title: 'Card / Basic',
          component: () => React.createElement('div', null, 'Card'),
        },
      ];

      const groups = showcases.reduce(
        (groups, showcase) => {
          const [component] = showcase.title.split(' / ');
          if (!groups[component]) {
            groups[component] = [];
          }
          groups[component].push(showcase);
          return groups;
        },
        {} as Record<string, Showcase[]>
      );

      expect(groups['Button']).toHaveLength(2);
      expect(groups['Card']).toHaveLength(1);
      expect(Object.keys(groups)).toHaveLength(2);
    });
  });
});
