import React, { useState } from "react";
import styles from "./index.module.scss";

const monthNames = [
  "一月",
  "二月",
  "三月",
  "四月",
  "五月",
  "六月",
  "七月",
  "八月",
  "九月",
  "十月",
  "十一月",
  "十二月",
];

const daysOfMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const firstDayOfMonth = (year: number, month: number) => {
  return new Date(year, month, 1).getDay();
};

interface CalendarProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = (props) => {
  const { defaultValue = new Date(), onChange } = props;

  const [date, setDate] = useState<Date>(defaultValue);

  console.log("render");

  const handlePrevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1));
  };

  const clickDayHandle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const key = target.dataset.key;
    if (!key) return;
    const curDate = new Date(date.getFullYear(), date.getMonth(), Number(key));
    setDate(curDate);
    onChange?.(curDate);
  };

  const renderDates = () => {
    const days = [];

    const daysCount = daysOfMonth(date.getFullYear(), date.getMonth());
    const firstDay = firstDayOfMonth(date.getFullYear(), date.getMonth());

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className={styles.empty}></div>);
    }

    for (let i = 1; i <= daysCount; i++) {
      if (i === date.getDate()) {
        days.push(
          <div key={i} data-key={i} className={`${styles.day} ${styles.selected}`}>
            {i}
          </div>
        );
      } else {
        days.push(
          <div key={i} data-key={i} className={`${styles.day}`}>
            {i}
          </div>
        );
      }
    }

    return (
      <div style={{ display: "flex", flexWrap: "wrap" }} onClick={clickDayHandle}>
        {days}
      </div>
    );
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <div>
          {date.getFullYear()} 年 {monthNames[date.getMonth()]}
        </div>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className={styles.days}>
        <div className={styles.day}>日</div>
        <div className={styles.day}>一</div>
        <div className={styles.day}>二</div>
        <div className={styles.day}>三</div>
        <div className={styles.day}>四</div>
        <div className={styles.day}>五</div>
        <div className={styles.day}>六</div>
        {renderDates()}
      </div>
    </div>
  );
};

export default Calendar;
