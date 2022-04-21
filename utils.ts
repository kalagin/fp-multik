// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop() {}

export function first(arr: readonly any[]) {
  return arr[0];
}

export function last(arr: readonly any[]) {
  return arr[arr.length - 1];
}

export function isPrimitive(obj: any) {
  return obj !== Object(obj);
}

export function deepEqual(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;
  if (isPrimitive(obj1) && isPrimitive(obj2)) return obj1 === obj2;
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;

  for (const key in obj1) {
    if (!(key in obj2)) return false;
    if (!deepEqual(obj1[key], obj2[key])) return false;
  }

  return true;
}
