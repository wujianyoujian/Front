function create(proto) {
  if (proto === null) {
    const obj = {};
    Object.setPrototypeOf(obj, null);
    return obj;
  }
  function F() {}
  F.prototype = proto;
  return new F();
}

function myCreate(proto) {
  if (proto === null) {
    const obj = {};
    Object.setPrototypeOf(obj, null);
    return obj;
  }
  function F() {}
  F.prototype = proto;
  return new F();
}
