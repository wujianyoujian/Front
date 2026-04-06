// define('a', [], () => {

// })

// define('b', ['a'], (a) => {

// })

// require(['b'], function(b) {
//   console.log(b)
// })

(function (global) {
  const moduleMap = {};
  const loadingMap = {};

  function define(id, deps, factory) {
    moduleMap[id] = {
      id,
      deps,
      factory,
      exports: undefined,
      initialized: false,
    };
  }

  async function loadAsyncModule(id) {

    if (!moduleMap[id]) {
      await loadScript(id);
    }

    const module = moduleMap[id];

    if (!module) {
      throw new Error(`模块${id}不存在`);
    }
    if (module.initialized) {
      return module.exports;
    }

    const deps = module.deps.map((depId) => loadAsyncModule(depId));
    const result = module.factory(...deps);

    module.exports = result;
    module.initialized = true;

    return module.exports;
  }

  function resolvePath(id) {
    return `./${id}.js`;
  }

  function loadScript(id) {
    if (loadingMap[id]) {
      return loadingMap[id];
    }

    loadingMap[id] = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = resolvePath(id);
      script.async = true;

      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`加载模块 ${id} 失败`));

      document.body.appendChild(script);
    });

    return loadingMap[id];
  }

  async function require(deps, callback) {
    const args = deps.map(async (id) => await loadAsyncModule(id));
    callback(...(await Promise.all(args)));
  }

  global.define = define;
  global.require = require;
})(globalThis);
