function cloneDeep<T extends object = object>(obj: T) {
  if (obj === null || typeof obj !== "object" || typeof obj === "function") {
    return obj;
  }

  return Array.isArray(obj)
    ? obj.map((obj) => structuredClone(obj))
    : structuredClone(obj);
}

export default cloneDeep;
