import Icon from "./Icon";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useState } from "react";
const TimeInput = ({
  className,
  label,
  icon,
  isError,
  handleChange,
  value,
  disabled,
  ...rest
}) => {
  const [vv,setVV]=useState(value)
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

          {vv && <div>{vv}</div>}

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
            disabled={disabled}
              sx={{
                "& .MuiInputBase-root": {
                  padding: 0,
                  height: '0px',
                  "& .MuiButtonBase-root": {
                    padding: 0,
                  },
                  "& .MuiInputBase-input": {
                    paddingLeft: 0,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                },
              }}
              onChange={(e)=>{
                setVV("")
                handleChange(e)
              }}
            />
          </LocalizationProvider>
        </div>
      </div>
    </>
  );
};

export default TimeInput;
