import MReact, { useEffect, useCallBack, useRef, useState, useMemo, useLayoutEffect } from "./src/MReact"

function Timer() {
  useEffect(() => {
    const id = setInterval(() => {
      console.log("tick", Date.now())
    }, 1000)

    return () => {
      clearInterval(id)
      console.log("Timer cleaned up")
    }
  }, [])

  return <p>Timer is running...</p>
}

/** @jsx MReact.createElement */
function App() {
  const [count, setCount] = useState(0)
  const [num, setNum] = useState(0)
  const [show, setShow] = useState(false)
  const domRef = useRef(null);

  const count1 = useMemo(() => {
    return num + "ces"
  }, [num])

  console.log(count1)

  useEffect(() => {
    console.log(123)
  }, [])

  useLayoutEffect(() => {
    console.log(12333)
  }, [])

  useLayoutEffect(() => {
    console.log(domRef)
  }, [domRef.current])

  return (
    <div ref={domRef}>
      <h1 style={{ userSelect: 'none' }} onClick={() => setCount(c => c + 1)}>{count}</h1>
      <h1 style={{ userSelect: 'none' }} onClick={() => setNum(n => n + 1)}>{num}</h1>
      <button onClick={() => setShow(s => !s)}>
        {show ? "卸载 Timer" : "挂载 Timer"}
      </button>
      {show ? <Timer /> : <p>Timer unmounted</p>}
    </div>
  )
}

export default App
