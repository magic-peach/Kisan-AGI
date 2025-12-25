import React from "react";
import { Button } from "@/components/ui/button";

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
  error?: Error;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Surface to console for debugging
    console.error("App crashed:", error);
    console.error("Component stack:", info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <div className="glass-card-glow w-full max-w-2xl p-6">
          <h1 className="font-orbitron text-2xl font-bold text-foreground">Something went wrong</h1>
          <p className="mt-2 text-muted-foreground">
            The app hit a runtime error and stopped rendering.
          </p>
          <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-card/60 p-4 text-sm text-muted-foreground border border-border/50">
            {this.state.error?.message ?? "Unknown error"}
          </pre>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="neon" onClick={() => window.location.reload()}>
              Reload
            </Button>
            <Button variant="glass" onClick={() => this.setState({ hasError: false, error: undefined })}>
              Try again
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
