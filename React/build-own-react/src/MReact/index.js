import { createElement } from "./createElement.js"
import { render } from "./reconciler.js"
import { useState, useEffect } from "./hooks.js"

const MReact = {
  createElement,
  render,
  useState,
  useEffect
}

export default MReact
export { createElement, render, useState }
