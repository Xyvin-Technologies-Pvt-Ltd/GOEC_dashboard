import React from "react";
import { Button } from "@/components/ui/button";

export default class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("Route error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-xl font-semibold text-destructive">Something went wrong</h1>
          <p className="max-w-md text-sm text-muted-foreground">
            {this.state.error?.message || "An unexpected error occurred. You can try again."}
          </p>
          <Button type="button" onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}
