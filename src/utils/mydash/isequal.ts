type PlainObject<T = unknown> = {
	[k in string]: T;
};

function isEqual(a: PlainObject, b: PlainObject): boolean {
  if (a === b) {
    return true;
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (!keysB.includes(key) || !isEqual(a[key] as PlainObject, b[key] as PlainObject)) {
      return false;
    }
  }

  return true;
}

export default isEqual;

const a = { a: 1 };
const b = { a: 1 };
console.log(isEqual(a, b)); // true
