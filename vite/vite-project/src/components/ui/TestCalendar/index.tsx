import { useState } from "react";

interface CalendarProps {
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

const Calendar = (props: CalendarProps) => {
  const { value: propsValue, defaultValue, onChange } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = propsValue !== undefined;
  const value = isControlled ? propsValue : internalValue;

  function changeValue(date: Date) {
    if (!isControlled) {
      setInternalValue(date);
    }
    onChange?.(date);
  }

  return (
    <div>
      {value?.toLocaleDateString()}
      <div onClick={() => changeValue(new Date("2024-5-1"))}>2024-5-1</div>
      <div onClick={() => changeValue(new Date("2024-5-2"))}>2024-5-2</div>
      <div onClick={() => changeValue(new Date("2024-5-3"))}>2024-5-3</div>
    </div>
  );
};

export default Calendar;
