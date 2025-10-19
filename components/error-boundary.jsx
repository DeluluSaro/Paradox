"use client";

import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Check if it's a serialization error
    if (error.message && error.message.includes('Only plain objects')) {
      console.warn('Serialization error caught and handled:', error.message);
      return { hasError: true, error: null };
    }
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error but don't show it to the user
    if (error.message && error.message.includes('Only plain objects')) {
      console.warn('Serialization error suppressed:', error.message);
      return;
    }
    
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // For serialization errors, just render children normally
      if (this.state.error === null) {
        return this.props.children;
      }
      
      // For other errors, show fallback
      return this.props.fallback || <div>Something went wrong.</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

