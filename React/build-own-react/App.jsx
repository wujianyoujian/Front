import MReact from "./src/MReact"

function Timer() {
  MReact.useEffect(() => {
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
  const [count, setCount] = MReact.useState(0)
  const [num, setNum] = MReact.useState(0)
   const [show, setShow] = MReact.useState(true)

  MReact.useEffect(() => {
    console.log(123)
  }, [])

  return (
    <div>
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
