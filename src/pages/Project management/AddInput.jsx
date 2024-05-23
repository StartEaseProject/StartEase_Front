import profile from "../../assets/Project management/profile.png";
import { useState } from "react";
const AddInput = ({ handleChange, ...rest }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleValidateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <>
      <div {...rest} className="flex justify-between max-w-[27rem] py-2">
        <div className="flex gap-4">
          <img
            src={profile}
            alt="profile pic"
            className="h-8 w-8 rounded-full object-cover"
          />
          <input
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            type="text"
            className="w-[20rem] text-secondaryColor bg-transparent"
          />
        </div>
        <button
          onClick={async () => {
            if(value!==''){
                if (handleValidateEmail(value)) {
              handleChange(value);
              setValue("");
              setError("");
            } else {
              setError("Unvalid email");
              await sleep(4000);
              setError("");
            } 
            } else {
               setError("This field can't be empty");
              await sleep(4000);
              setError("");
            }
         
          }}
          className="text-primaryColor text-fs-400"
        >
          Add
        </button>
      </div>
      {error && <div className="text-mainRed text-fs-300">{error}</div>}
    </>
  );
};

export default AddInput;
