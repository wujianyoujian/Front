import { createElement } from "./createElement.js";
import { render, setSuspenseComponent } from "./reconciler.js";
import { createStore } from "./zustand.js";
import { lazy } from "./lazy.js";
import { Suspense } from "./suspense.js";
import {
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallBack,
  useMemo,
} from "./hooks.js";

setSuspenseComponent(Suspense);

const MReact = {
  createElement,
  render,
  useReducer,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallBack,
  useMemo,
  createStore,
  Suspense,
  lazy,
};

export default MReact;
export {
  createElement,
  render,
  useState,
  useReducer,
  useLayoutEffect,
  useRef,
  useCallBack,
  useMemo,
  useEffect,
  createStore,
  Suspense,
  lazy,
};
