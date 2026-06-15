import dayjs from "dayjs";
// import Test from "./components/Test";
import LocaleContext from "../../contexts/locale";
import { Form, Input } from "antd";
import Button from "@arco-design/web-react/es/Button";
import Space from "@arco-design/web-react/es/Space";
import { Suspense, lazy, startTransition, useEffect, useState } from "react";
import { Link } from "@src/MyRoute";
import useStore from "../../stores/theme";
// import { ThemeContext, type THEME_TYPE } from "@src/contexts/theme";

const CalendarTest = lazy(() => import("../../components/ui/Calendar"));

function Index() {
  const [count, setCount] = useState<number>(0);
  const setTheme = useStore((state) => state.setTheme);
  // const [theme, setTheme] = useState<THEME_TYPE>("ligth");

  // const List = useMemo(() => {
  //   return (
  //     <div style={{ height: "400px", overflowY: "scroll" }}>
  //       {new Array(2000000).fill(1).map((item, index) => {
  //         return <div className="list-item">{item + index}</div>;
  //       })}
  //     </div>
  //   );
  // }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCount(count + 1); // SyncLane
    startTransition(() => {
      setCount((n) => n + 100); // TransitionLane
    });
    setCount(count + 3);
  }, []);

  return (
    <div>
      <div>{count}</div>
      {/* {List} */}
      <button
        onClick={() => {
          setTheme("dark");
        }}
      >
        click theme
      </button>
      <LocaleContext value={navigator.language}>
        <Link to="/second/1234">second</Link>
        <Form>
          <Input />
          <Input />
        </Form>
        <Suspense>
          <CalendarTest value={dayjs("2024-11-4")} />
        </Suspense>
        <Space size="large">
          <Button type="primary">Primary</Button>
          <Button type="secondary">Secondary</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="outline">Outline</Button>
          <Button type="text">Text</Button>
        </Space>
        {/* <Test /> */}
        {/* <Header></Header> */}
        {/* <CalendarTest
            className={"aaa"}
            value={dayjs("2024-11-4")}
            // styles={{ background: "red" }}
            dateInnerContent={() => {
              return <div>123</div>;
            }}
          ></CalendarTest> */}
      </LocaleContext>
    </div>
  );
}

export default Index;
