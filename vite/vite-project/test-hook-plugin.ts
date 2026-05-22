function testHookPlugin() {
  return {
    name: "test-hooks-plugin",
    // vite 独有的钩子
    config() {
      console.log("config");
    },
    configResolve() {
      console.log("resolveConfig");
    },
    options() {
      console.log("options");
    },
    configureServer() {
      console.log("server");
      setTimeout(() => {
        // 手动退出进程
        // process.kill(process.pid, "SIGTERM");
      }, 3000);
    },
    buildStart() {
      console.log("buildStart");
    },
    // 通用钩子
    buildEnd() {
      console.log("buildEnd");
    },
    // 通用钩子
    closeBundle() {
      console.log("closeBundle");
    },
  };
}

export default testHookPlugin;
