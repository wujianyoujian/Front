function getType(obj) {
  const originType = Object.prototype.toString.call(obj);
  const type = originType.slice(8, -1);
  return type.toLowerCase();
}
