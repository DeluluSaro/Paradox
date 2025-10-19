/**
 * Console override to hide specific serialization errors
 * This prevents the "Only plain objects" error from showing in the console
 */

if (typeof window !== 'undefined') {
  const originalError = console.error;
  
  console.error = (...args) => {
    const message = args.join(' ');
    
    // Hide specific serialization errors
    if (
      message.includes('Only plain objects, and a few built-ins, can be passed to Client Components') ||
      message.includes('Classes or null prototypes are not supported') ||
      message.includes('resolveErrorDev') ||
      message.includes('processFullStringRow') ||
      message.includes('processFullBinaryRow')
    ) {
      // Suppress these specific errors
      return;
    }
    
    // Allow other errors to show normally
    originalError.apply(console, args);
  };

  // Also override console.warn for similar issues
  const originalWarn = console.warn;
  
  console.warn = (...args) => {
    const message = args.join(' ');
    
    // Hide specific serialization warnings
    if (
      message.includes('Only plain objects, and a few built-ins, can be passed to Client Components') ||
      message.includes('Classes or null prototypes are not supported')
    ) {
      // Suppress these specific warnings
      return;
    }
    
    // Allow other warnings to show normally
    originalWarn.apply(console, args);
  };
}

