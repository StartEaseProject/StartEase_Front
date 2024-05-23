import Icon from "./Icon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

const DatePickerInput = ({
  max,
  min,
  className,
  label,
  icon,
  value,
  isError,
  disabled,
  handleChange,
  ...rest
}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  return (
    <>
      <div {...rest} className={`group ` + className}>
        <label
          className={` group-focus-within:text-primaryColor text-fs-300 ${
            isError ? "text-mainRed" : "text-thirdColor"
          }`}
        >
          {label}
        </label>
        <div
          className={`bg-secondBgColor 
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline ${
                  label && "mt-1"
                } 
                ${
                  isError
                    ? "outline-mainRed outline bg-white"
                    : "bg-secondBgColor "
                } `}
        >
          {icon && (
            <Icon
              icon={icon}
              className={`shrink-0 group-focus-within:stroke-primaryColor ${
                isError ? "stroke-mainRed" : "stroke-thirdColor "
              }`}
            />
          )}
          <DatePicker
            disabled={disabled}
            onChange={(e) => {
              setSelectedDate(e);
              handleChange(e);
            }}
            className="bg-transparent text-thirdColor"
            placeholderText="Select a date"
            selected={selectedDate}
            value={value}
            minDate={min}
            maxDate={max}
            dateFormat="yyyy-MM-dd"
          />
        </div>
      </div>
    </>
  );
};

export default DatePickerInput;
