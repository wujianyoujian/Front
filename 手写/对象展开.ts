const obj = {
  a: {
    b: {
      c: 1,
    },
  },
  d: true,
  e: false,
  f: {
    g: 5,
  },
  h: [
    [2, 3],
    1,
    2,
    3,
    {
      i: 12,
      j: 123,
    },
  ],
};

function flatten(obj: any, path: string[] = [], result: any = {}) {
  if (obj === null) {
    return obj;
  }

  for (let key in obj) {
    path.push(key);
    if (typeof obj[key] === "object") {
      flatten(obj[key], path, result);
    } else if (Array.isArray(obj[key])) {
      for (let j = 0; j < obj[key].length; j++) {
        path.push(String(j));
        if (typeof obj[key] === "object" || Array.isArray(obj[key])) {
          flatten(obj[key], path, result);
        } else {
          result[path.join(".")] = obj[key];
        }
        path.pop();
      }
    } else {
      result[path.join(".")] = obj[key];
    }
    path.pop();
  }
  return result;
}

const result = flatten(obj);
console.log(result);

function flatten1(obj, prefix = "", result = {}) {
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const val = obj[key];

    if (val !== null && typeof val === "object") {
      flatten(val, fullKey, result);
    } else {
      result[fullKey] = val;
    }
  }
  return result;
}
