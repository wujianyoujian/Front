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

// ============ 改进版本 ============

type Primitive = string | number | boolean | null | undefined;

type FlattenedResult = Record<string, Primitive>;

function flattenImproved(
  obj: Record<string, unknown>,
  path: string[] = [],
  result: FlattenedResult = {}
): FlattenedResult {
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];
    path.push(key);

    if (value === null || value === undefined) {
      result[path.join(".")] = value;
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        path.push(String(index));
        if (item !== null && typeof item === "object") {
          flattenImproved(item as Record<string, unknown>, path, result);
        } else {
          result[path.join(".")] = item as Primitive;
        }
        path.pop();
      });
    } else if (typeof value === "object") {
      flattenImproved(value as Record<string, unknown>, path, result);
    } else {
      result[path.join(".")] = value as Primitive;
    }

    path.pop();
  }
  return result;
}

const result2 = flattenImproved(obj);
console.log(result2);
