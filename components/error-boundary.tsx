"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Error caught by ErrorBoundary:", error, errorInfo)
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="p-6 rounded-lg border border-destructive/20 bg-destructive/5 text-destructive">
          <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
          <p className="text-sm mb-4">{this.state.error?.message || "An unexpected error occurred"}</p>
          <Button variant="outline" onClick={() => this.setState({ hasError: false })}>
            Try again
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
