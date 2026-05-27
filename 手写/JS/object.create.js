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

function objectCreate(proto) {
  if (proto == null) {
    let obj = {};
    Object.setPrototypeOf(obj, null);
    return obj;
  }

  function Foo() {}

  Foo.prototype = proto;

  return new Foo();
}

function ObjectCreate1(proto) {
  if (proto == null) {
    let obj = null;
    Object.setPrototypeOf(obj, null);
    return obj;
  }
  function Foo() {}
  Foo.prototype = proto;
  return new Foo();
}
