function compose(...fns) {
  return async function (x) {
    let result = x;
    for (let i = fns.length - 1; i > 0; i--) {
      result = await fns[i](result);
    }
    return result;
  };
}
