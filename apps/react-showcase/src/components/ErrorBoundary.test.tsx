import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { ErrorBoundary } from './ErrorBoundary';

// Component that throws an error
const ThrowError = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error message');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests since we expect errors
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('catches errors and displays default error UI', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
  });

  it('displays error stack in details element', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const details = screen.getByText('View error details');
    expect(details).toBeInTheDocument();
  });

  it('resets error state when "Try again" button is clicked', async () => {
    const user = userEvent.setup();

    // Use a state-based component to properly test error reset
    const TestComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(true);

      return (
        <div>
          <button onClick={() => setShouldThrow(false)}>Fix Error</button>
          <ErrorBoundary>
            <ThrowError shouldThrow={shouldThrow} />
          </ErrorBoundary>
        </div>
      );
    };

    render(<TestComponent />);

    // Error UI should be displayed
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();

    // Fix the error condition first
    await user.click(screen.getByText('Fix Error'));

    // Click the "Try again" button to reset the error boundary
    const tryAgainButton = screen.getByRole('button', { name: /try again/i });
    await user.click(tryAgainButton);

    // After reset, the component should attempt to render children again
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = (error: Error, resetError: () => void) => (
      <div>
        <h1>Custom Error UI</h1>
        <p>{error.message}</p>
        <button onClick={resetError}>Reset</button>
      </div>
    );

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom Error UI')).toBeInTheDocument();
    expect(screen.getByText('Test error message')).toBeInTheDocument();
    expect(screen.queryByText('Something went wrong')).not.toBeInTheDocument();
  });

  it('calls custom fallback reset function', async () => {
    const user = userEvent.setup();
    const resetMock = vi.fn();
    let shouldThrow = true;

    const customFallback = (_error: Error, resetError: () => void) => (
      <div>
        <h1>Custom Error UI</h1>
        <button onClick={() => {
          resetError();
          resetMock();
        }}>Reset</button>
      </div>
    );

    const { rerender } = render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    );

    const resetButton = screen.getByRole('button', { name: /reset/i });
    shouldThrow = false;

    await user.click(resetButton);

    expect(resetMock).toHaveBeenCalledTimes(1);

    rerender(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={shouldThrow} />
      </ErrorBoundary>
    );
  });

  it('logs error to console when error is caught', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error');

    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('displays error with proper styling classes', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    const errorHeader = screen.getByText('Something went wrong');
    expect(errorHeader).toHaveClass('text-lg', 'font-semibold');
  });

  it('handles multiple sequential errors', () => {
    const { rerender } = render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>
    );

    expect(screen.getByText('Test error message')).toBeInTheDocument();

    // Rerender with a different error
    const ThrowDifferentError = () => {
      throw new Error('Different error');
    };

    rerender(
      <ErrorBoundary>
        <ThrowDifferentError />
      </ErrorBoundary>
    );

    // Should still show error UI (may show the original error since state hasn't been reset)
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });
});
