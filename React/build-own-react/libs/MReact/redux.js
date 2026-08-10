export function createStore(reducer) {
  let state;
  const listeners = new Set();

  const getState = () => state;

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  };

  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  dispatch({ type: "@@INIT" });

  return { getState, dispatch, subscribe };
}

function counter(state = { count: 0 }, action) {
  switch (action.type) {
    case "ADD":
      return { ...state, count: state.count + 1 };
    case "MINUS":
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

function todos(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, action.payload];
    default:
      return state;
  }
}

function combineReducers(reducers) {
  // 取出所有 key（模块名）
  const keys = Object.keys(reducers);

  // 返回一个”大 reducer“
  return function combination(state, action) {
    const next;
    let changed = false;

    for (const key of keys) {
      const reducer = reducers[key];
      const prevState = state[key]; // 该模块的旧 state
      const nextState = reducer(prevState, action); // 该模块的新 state

      next[key] = nextState;
      changed = changed || nextState !== prevState; // 只要有一个模块变了就算 changed
    }

    // 如果所有模块都没变，返回旧 state 引用（保证引用相等性）
    return changed ? next : state;
  };
}

let reducers = combineReducers({ counter, todos });

let store = createStore(reducers);

store.subscribe(() => console.log(store.getState()));

store.dispatch({ type: "ADD" });
