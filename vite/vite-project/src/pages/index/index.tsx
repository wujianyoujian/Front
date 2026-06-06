// import { useState } from "react";
// import { Header } from "./components/Header";
// import Calendar from "./components/Calendar";
// import { ThemeContext, type THEME_TYPE } from "./contexts/theme";
import dayjs from "dayjs";
// import Test from "./components/Test";
import LocaleContext from "../../contexts/locale";
import { Form, Input } from "antd";
import Button from "@arco-design/web-react/es/Button";
import Space from "@arco-design/web-react/es/Space";
import { Suspense, lazy, startTransition, useEffect, useState } from "react";
import { Link } from "@src/MyRoute";

const CalendarTest = lazy(() => import("../../components/ui/Calendar"));

function Index() {
  const [count, setCount] = useState<number>(0);
  // const [theme, setTheme] = useState<THEME_TYPE>("ligth");
  // const [value, setValue] = useState(new Date("2024-5-1"));
  useEffect(() => {
    setCount(count + 1); // SyncLane
    startTransition(() => {
      setCount((n) => n + 100); // TransitionLane
    });
    setCount(count + 3);
  }, []);

  return (
    // <ThemeContext value={theme}>
    // <LocaleContext value={navigator.language}>
    //   <Link to="/second/1234">second</Link>
    //   <Form>
    //     <Input />
    //     <Input />
    //   </Form>
    //   <Suspense>
    //     <CalendarTest value={dayjs("2024-11-4")} />
    //   </Suspense>
    //   <Space size="large">
    //     <Button type="primary">Primary</Button>
    //     <Button type="secondary">Secondary</Button>
    //     <Button type="dashed">Dashed</Button>
    //     <Button type="outline">Outline</Button>
    //     <Button type="text">Text</Button>
    //   </Space>
    //   {/* <Test /> */}
    //   {/* <Header></Header> */}
    //   <CalendarTest
    //     className={"aaa"}
    //     value={dayjs("2024-11-4")}
    //     // styles={{ background: "red" }}
    //     dateInnerContent={() => {
    //       return <div>123</div>;
    //     }}
    //   ></CalendarTest>
    // </LocaleContext>
    // </ThemeContext>
    <div>{count}</div>
  );
}

export default Index;
