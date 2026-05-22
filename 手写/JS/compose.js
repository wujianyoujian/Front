function compose(...fns) {
  return async function (x) {
    let result = x;
    for (let i = fns.length - 1; i > 0; i--) {
      result = await fns[i](result);
    }
    return result;
  };
}


function Compose1(fns) {
  return async function (x) {
    let result = x;

    for (let i = fns.length - 1; i > 0; i--) {
      result = await fns[i](result);
    }

    return result;
  }
}


{

  function compose(fns) {
    return function (x) {
      let result = x;

      for (let i = fns.length - 1; i > 0; i--) {
        result = fns[i](x)
      }

      return result
    }
  }
}