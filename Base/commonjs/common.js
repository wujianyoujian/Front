const moduleCache = {};

const fs = require("fs");
const path = require("path");

function myRequire(modulePath) {
  const absolutePath = path.resolve(__dirname, modulePath);

  if (moduleCache[absolutePath]) {
    return moduleCache[absolutePath].exports;
  }

  const module = {
    exports: {},
  };

  moduleCache[absolutePath] = module;

  const code = fs.readFileSync(absolutePath, "utf-8");

  const wrapper = new Function("require", "module", "exports", code);
  wrapper(myRequire, module, module.exports);

  return module.exports;
}

module.exports = myRequire
