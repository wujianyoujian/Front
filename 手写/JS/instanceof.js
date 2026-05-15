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

function myInstanceof(obj, constructor) {
  if (obj == null || (typeof obj !== "object" && typeof obj !== "function")) {
    return false;
  }
  let proto = Object.getPrototypeOf(obj);

  while (proto !== null) {
    if (proto === constructor.prototype) {
      return true;
    }
    proto = Object.getPrototypeOf(proto);
  }
  return false;
}

console.log(myInstanceof(null, Array));
console.log(myInstanceof([], Array));
console.log(myInstanceof("1", String));
console.log(myInstanceof(new Map(), Map));
