function getType(obj) {
  const originType = Object.prototype.toString.call(obj);
  const type = originType.slice(8, -1);
  return type.toLowerCase();
}


function getType(obj) {
  const originType = Object.prototype.toString.call(obj);
  const type = originType.slice(8, -1);
  return type.toLowerCase();
}

function getType(obj) {
  const str = Object.prototype.toString.apply(obj);
  return str.slice(8, -1).toLocaleLowerCase
}