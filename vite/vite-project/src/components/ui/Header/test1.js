let deps = null;
const useEffect = (fn, _deps) => {
  const isSameDeps = deps ? deps.every((dep, i) => dep === _deps[i]) : false;
  if (!isSameDeps) {
    fn();
  }
  deps = _deps;
};

const App = (count = 0) => {

  useEffect(() => {
    setInterval(() => {
      console.log("count", ++count);
    }, 1000);
  }, []);
};

App();