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
import { Suspense, lazy } from "react";

const CalendarTest = lazy(() => import("../../components/ui/Calendar"));

function Index() {
  // const [theme, setTheme] = useState<THEME_TYPE>("ligth");
  // const [value, setValue] = useState(new Date("2024-5-1"));

  return (
    // <ThemeContext value={theme}>
    <LocaleContext value={navigator.language}>
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
      <CalendarTest
        className={"aaa"}
        value={dayjs("2024-11-4")}
        // styles={{ background: "red" }}
        dateInnerContent={() => {
          return <div>123</div>;
        }}
      ></CalendarTest>
    </LocaleContext>
    // </ThemeContext>
  );
}

export default Index;
