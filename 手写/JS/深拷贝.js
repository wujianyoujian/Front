function deepClone(val, map = new WeakMap()) {
  if (val == null || typeof val !== "object") return val;
  if (map.has(val)) return map.get(val);
  if (val instanceof Date) return new Date(val);
  if (val instanceof RegExp) return new RegExp(val);

  if (val instanceof Map) {
    const m = new Map();
    map.set(val, m);
    val.forEach((v, k) => m.set(deepClone(k, map), deepClone(v, map)));
    return m;
  }
  if (val instanceof Set) {
    const s = new Set();
    map.set(val, s);
    val.forEach((v) => s.add(deepClone(v, map)));
    return s;
  }

  const clone = Array.isArray(val) ? [] : {};

  map.set(val, clone);
  for (const key of Reflect.ownKeys(val)) {
    clone[key] = deepClone(val[key], map);
  }
  return clone;
}

function deepClone1(val, map = new WeakMap()) {
  if (val == null || typeof val !== "object") return val;
  if (map.has(val)) return map.get(val);
  if (val instanceof RegExp) return new RegExp(val);
  if (val instanceof Date) return new Date(val);

  if (val instanceof Map) {
    const m = new Map();
    map.set(val, m);
    val.forEach((v, k) => m.set(deepClone1(k, map), deepClone1(v, map)));
    return m;
  }

  if (val instanceof Set) {
    const s = new Set();
    map.set(val, s);
    val.forEach((v) => s.add(deepClone1(v, map)));
    return s;
  }

  const clone = Array.isArray(val) ? [] : {};
  map.set(val, clone);
  for (const key of Reflect.ownKeys(val)) {
    clone[key] = deepClone1(val[key], map);
  }

  return clone;
}
