const isEvent = key => key.startsWith("on")
const isProperty = key => key !== "children" && !isEvent(key)
const isNew = (prev, next) => key => prev[key] !== next[key]
const isGone = (prev, next) => key => !(key in next)

function createDom(fiber) {
  const dom =
    fiber.type === "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type)

  updateDom(dom, {}, fiber.props)
  return dom
}

function updateDom(dom, prevProps, nextProps) {
  // 移除旧事件：事件已消失，或处理函数发生了变化（引用不同）
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      dom.removeEventListener(name.toLowerCase().slice(2), prevProps[name])
    })

  // 移除已消失的 DOM 属性（新 props 中不再存在的属性置空）
  Object.keys(prevProps)
    .filter(isProperty)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => { dom[name] = "" })

  // 更新变化的 DOM 属性
  Object.keys(nextProps)
    .filter(isProperty)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      if (name === 'style') {
        // style 是对象，不能直接赋值给 dom.style，需逐属性操作
        // 先清除旧有但新 style 中不存在的属性，避免残留样式
        Object.keys(prevProps.style || {}).forEach(s => {
          if (!(s in (nextProps.style || {}))) dom.style[s] = ''
        })
        // 再将新 style 的所有属性合并到 dom.style
        Object.assign(dom.style, nextProps.style)
      } else {
        dom[name] = nextProps[name]
      }
    })

  // 添加新事件：新增的或处理函数变化后重新绑定
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom.addEventListener(name.toLowerCase().slice(2), nextProps[name])
    })
}

export { createDom, updateDom }
