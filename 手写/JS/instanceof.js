/**
 * instanceof 实现
 */
// function myInstanceof(obj, constructor) {
//   if (obj == null || (typeof obj !== "object" && typeof obj !== "function")) {
//     return false;
//   }

//   let proto = Object.getPrototypeOf(obj);

//   while (proto !== null) {
//     if (proto === constructor.prototype) {
//       return true;
//     }
//     proto = constructor.prototype;
//   }
//   return false;
// }

// function myInstanceof(obj, constructor) {
//   if (obj == null || (typeof obj !== "object" && typeof obj !== "function")) {
//     return false;
//   }
//   let proto = Object.getPrototypeOf(obj);

//   while (proto !== null) {
//     if (proto === constructor.prototype) {
//       return true;
//     }
//     proto = Object.getPrototypeOf(proto);
//   }
//   return false;
// }

// function myInstanceof(obj, constructor) {
//   if (obj == null || (typeof obj !== "function" && typeof obj !== "object")) {
//     return false;
//   }

//   let proto = Object.getPrototypeOf(obj);

//   while (proto !== null) {
//     if (proto === constructor.prototype) {
//       return true;
//     }
//     proto = Object.getPrototypeOf(proto);
//   }
// }

// function myInstanceof(obj, construcotor) {
//   if (obj == null || (typeof obj !== "function" && typeof obj !== "object")) {
//     return false;
//   }

//   let proto = Object.getPrototypeOf(obj);
//   while (proto !== null) {
//     if (proto === construcotor.prototype) {
//       return true;
//     }
//     proto = Object.getPrototypeOf(proto);
//   }
//   return false;
// }

function myInstanceof(obj, construcotor) {
  if (obj == null || (typeof obj !== "function" && typeof obj !== "object")) {
    return false;
  }

  const proto = Object.getPrototypeOf(obj);
  while (proto != null) {
    if (proto === construcotor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

// function myInstanceof1(obj, constructor) {
//   if (obj == null || (typeof obj !== 'object' && typeof obj !== 'function')) return false

//   let proto = Object.getPrototypeOf(obj);
//   while (proto !== null) {
//     if (proto === constructor.prototype) {
//       return true
//     }
//     proto = Object.getPrototypeOf(proto)
//   }
//   return falses

// }

function myInstanceof2(obj, constructor) {
  if (obj == null || (typeof obj !== "object" && typeof obj !== "function")) {
    return false;
  }

  let proto = Object.getPrototypeOf(obj);
  while (proto) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

console.log(myInstanceof2(null, Array));
console.log(myInstanceof2([], Array));
console.log(myInstanceof2("1", String));
console.log(myInstanceof2(new Map(), Map));
