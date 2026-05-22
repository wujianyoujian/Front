import MonthCalendar from "./MonthCalendar";
import { Dayjs } from "dayjs";
import styles from "./index.module.scss";
import Header from "./Header";
import type { CSSProperties, ReactNode } from "react";
import classnames from "classnames";

interface CalendarBaseProps {
  value: Dayjs;
  styles?: CSSProperties;
  className?: string | string[];
  locale?: string;
  onChange?: (date: Dayjs) => void;
}

export type CalendarProps = CalendarBaseProps &
  (
    | { dateRender: (currentDate: Dayjs) => ReactNode; dateInnerContent?: never }
    | { dateRender?: never; dateInnerContent: (currentDate: Dayjs) => ReactNode }
    | { dateRender?: never; dateInnerContent?: never }
  );

const Calendar = (props: CalendarProps) => {
  const {
    //  value,
    className,
    styles: custStyles,
  } = props;

  return (
    <div className={classnames(styles.calendar, className)} style={{ ...custStyles }}>
      <Header />
      <MonthCalendar {...props} />
    </div>
  );
};

export default Calendar;
