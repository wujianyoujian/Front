import { createElement } from "./createElement.js"
import { render } from "./reconciler.js"
import { useState, useEffect, useLayoutEffect, useRef, useCallBack, useMemo } from "./hooks.js"

const MReact = {
  createElement,
  render,
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  useCallBack,
  useMemo
}

export default MReact
export { createElement, render, useState, useLayoutEffect, useRef, useCallBack, useMemo, useEffect }
