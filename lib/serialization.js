/**
 * Utility functions for serializing complex objects to plain objects
 * This helps prevent "Only plain objects" errors in Next.js
 */

export function serializeObject(obj) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeObject);
  }

  if (obj.constructor && obj.constructor.name !== 'Object') {
    // Handle class instances by converting to plain object
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key, serializeObject(value)])
    );
  }

  // Handle plain objects
  const serialized = {};
  for (const [key, value] of Object.entries(obj)) {
    serialized[key] = serializeObject(value);
  }

  return serialized;
}

export function serializePrismaObject(obj) {
  if (!obj) return obj;

  const serialized = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (value instanceof Date) {
      serialized[key] = value.toISOString();
    } else if (Array.isArray(value)) {
      serialized[key] = value.map(item => 
        item && typeof item === 'object' ? serializePrismaObject(item) : item
      );
    } else if (value && typeof value === 'object' && value.constructor && value.constructor.name !== 'Object') {
      serialized[key] = serializePrismaObject(value);
    } else {
      serialized[key] = value;
    }
  }

  return serialized;
}

export function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (obj instanceof Date) {
    return new Date(obj.getTime());
  }

  if (Array.isArray(obj)) {
    return obj.map(deepClone);
  }

  const cloned = {};
  for (const [key, value] of Object.entries(obj)) {
    cloned[key] = deepClone(value);
  }

  return cloned;
}

