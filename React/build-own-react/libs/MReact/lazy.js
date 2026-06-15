function lazy(factory) {
  const payload = {
    _status: -1,
    _result: factory,
  };

  function LazyComponent(props) {
    if (payload._status === -1) {
      const thenable = payload._result();
      payload._status = 0;
      payload._result = thenable;
      thenable.then(
        (module) => {
          payload._status = 1;
          payload._result = module.default || module;
        },
        (err) => {
          payload._status = 2;
          payload._result = err;
        },
      );
    }

    if (payload._status === 1) {
      // 拿到真实组件，用 createElement 生成 vdom
      return { type: payload._result, props: props || {} };
    }

    throw payload._result;
  }

  return LazyComponent;
}

export { lazy };
