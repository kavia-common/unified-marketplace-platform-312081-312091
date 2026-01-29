import React from 'react';

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  error: Error | null;
};

/**
 * PUBLIC_INTERFACE
 * A small React error boundary to prevent a full blank screen when any descendant throws.
 *
 * This is intentionally minimal and framework-agnostic (no external deps). It logs
 * the error to console and shows a fallback UI so the app still "renders".
 */
export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Keep console logging so the root cause is still visible in devtools/CI logs.
    // eslint-disable-next-line no-console
    console.error('Unhandled React render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 16 }}>
          <div className="card" style={{ padding: 16 }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Something went wrong</div>
            <div className="muted" style={{ marginTop: 6, fontSize: 13 }}>
              The UI hit a runtime error. Check the browser console for details.
            </div>

            <div className="divider" style={{ margin: '12px 0' }} />

            <pre
              style={{
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: 12,
                color: 'var(--muted)',
              }}
            >
              {this.state.error.message}
            </pre>

            <div style={{ marginTop: 12, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Reload
              </button>
              <button className="btn" onClick={() => this.setState({ error: null })}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
