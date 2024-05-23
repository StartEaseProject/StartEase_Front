import logo from "../../assets/globals/logo.svg";
import { Input, LoadingAnimation } from "../../components/globals";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/globals";
import back from "../../assets/Icons/arrow-left.svg";
import API from "../../utils/api-client";

export const ResetPasswordPage = ({ advance, changeEmail }) => {
  const emailRef = useRef("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleNext = async () => {
    if (emailRef.current.trim() == "") {
      setError("Please enter your email address");
      return;
    } else if (!isValidEmail(emailRef.current.trim())) {
      setError("Email is invalid");
    } else {
      setError("");
      setLoading(true);
      let email = emailRef.current.trim();
      try {
        await API.post("/forgotpassword/send", { email });
        setLoading(false);
        changeEmail(email);
        advance();
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    }
  };

  return (
    <section className="relative bg-bgColor min-h-screen  ">
      <div className=" absolute bottom-0 left-1/2 transform -translate-x-1/2   ">
        <div className="rounded-tl-lg rounded-tr-lg px-6 shadow-default mx-auto grid justify-items-center gap-4 bg-white min-w-[46.25rem] py-8">
          <img src={logo} alt="StartEase" className="pt-8" />
          <div className=" text-fs-700 text-secondaryColor ">
            Reset Password
          </div>
          <div className="w-2/3 text-center text-thirdColor text-fs-400">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
          <div className="grid gap-2">
            <Input
              label={"Email"}
              icon="email"
              isError={error}
              onChange={(e) => {
                emailRef.current = e.target.value;
              }}
              inputProps={{ placeholder: "Email address" }}
              className={"pb-2"}
            />

            {error ? (
              <div className=" pb-8 -mt-4 self-end  text-mainRed text-fs-400 hover:cursor-pointer">
                {error}
              </div>
            ) : (
              <></>
            )}

            <div className="pb-8">
              {loading ? (
                <LoadingAnimation className="w-8 scale-[5] mx-auto" />
              ) : (
                <Button onClick={handleNext}>Send verification code</Button>
              )}
            </div>
            <ul className="justify-self-center text-primaryColor text-fs-400 hover:cursor-pointer pb-16 inline-flex gap-2 ">
              <li>
                {" "}
                <img src={back} alt="go-back" />{" "}
              </li>
              <li>
                {" "}
                <Link to={"/signin"}>Go back to login</Link>{" "}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
