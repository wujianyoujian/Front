import type { Dayjs } from "dayjs";
import type { CalendarProps } from "..";
import styles from "../index.module.scss";
import { useContext, useState } from "react";
import LocaleContext from "@src/contexts/locale";
import { LocaleMap } from "@src/locales";
import useStore from "@src/stores/theme";

type MonthCalendarProps = CalendarProps;

interface DayInfo {
  date: Dayjs;
  currentMonth: boolean;
}

function getAllDays(date: Dayjs): DayInfo[] {
  const startDate = date.startOf("month");
  const day = startDate.day();

  const daysInfo: DayInfo[] = new Array(6 * 7);
  for (let i = 0; i < day; i++) {
    daysInfo[i] = {
      date: startDate.subtract(day - i, "day"),
      currentMonth: false,
    };
  }

  for (let i = day; i < daysInfo.length; i++) {
    const calcDate = startDate.add(i - day, "day");
    daysInfo[i] = {
      date: calcDate,
      currentMonth: calcDate.month() === date.month(),
    };
  }
  return daysInfo;
}

function chunkByWeek(days: DayInfo[]): DayInfo[][] {
  const rows: DayInfo[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }
  return rows;
}

const RenderRowCells = (props: {
  rows: DayInfo[][];
  dateInnerContent?: MonthCalendarProps["dateInnerContent"];
  dateRender?: MonthCalendarProps["dateRender"];
}) => {
  const { rows, dateInnerContent, dateRender } = props;

  return (
    <>
      {rows.map((row) => (
        <div key={row[0].date.format("YYYY-MM-DD")} className={styles["calendar-month-body-row"]}>
          {row.map((item) => {
            const cellClass = [
              styles["calendar-month-body-cell"],
              item.currentMonth && styles["calendar-month-body-cell-current"],
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <div key={item.date.format("YYYY-MM-DD")} className={cellClass}>
                {dateRender ? (
                  dateRender(item.date)
                ) : (
                  <div className={styles["calendar-month-body-cell-body"]}>
                    <div className={styles["calendar-month-body-cell-value"]}>
                      {item.date.date()}
                    </div>
                    <div className={styles["calendar-month-body-cell-content"]}>
                      {dateInnerContent?.(item.date)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
};

const MonthCalendar = (props: MonthCalendarProps) => {
  const { dateInnerContent, dateRender, locale } = props;

  console.log("Month Component render");
  const weekList = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ] as const;

  const theme = useStore((state) => state.theme);

  console.log(theme);

  const rows = chunkByWeek(getAllDays(props.value));

  return (
    <>
      <div className={styles["calendar-month-week-list"]}>
        {weekList.map((week) => (
          <div className={styles["calendar-month-week-list-item"]} key={week}>
            {LocaleMap["calendar"]["zh"].week[week]}
          </div>
        ))}
      </div>
      <div className={styles["calendar-month-body"]}>
        <RenderRowCells dateInnerContent={dateInnerContent} dateRender={dateRender} rows={rows} />
      </div>
    </>
  );
};

export default MonthCalendar;
