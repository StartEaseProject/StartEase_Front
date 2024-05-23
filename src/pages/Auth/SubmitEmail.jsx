import logo from "../../assets/globals/logo.svg";
import { Button, Icon } from "../../components/Globals";
import { Input } from "../../components/Globals";
import { useState, useRef } from "react";
import API from "../../utils/api-client";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";

const RegisterInfoPage = ({ advance, goBack, user }) => {
  const [emailError, setEmailError] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const handleValidateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let err = false;
    if (emailRef.current.trim() == "") {
      setEmailError("Email is required");
      err = true;
    }
    if (!handleValidateEmail(emailRef.current)) {
      setEmailError("Please enter a valid email");
      err = true;
    }
    if (!err) {
      try {
        setError("")
        setLoading(true);
        await API.post(`register`, {
          email: emailRef.current.trim(),
          person_type: user,
        });
        setLoading(false);
        advance();
      } catch (e) {
        setLoading(false);
        setError(e.response.data.message);
      }
    }
  };

  return (
    <section className="relative bg-bgColor min-h-screen  ">
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  px-10  ">
        <div
          className="rounded-tl-lg rounded-tr-lg px-6 shadow-default mx-auto grid justify-items-center gap-4 
          bg-white min-w-[46.25rem] py-8"
        >
          <img src={logo} alt="StartEase" className="" />
          <div className=" text-fs-600 text-secondaryColor font-semibold">
            StartEase
          </div>
          <div className="max-w-[30rem] text-center text-thirdColor">
            Welcome to StartEase Platform.Please enter your email and password
            to access to the website.
          </div>
          <form className="grid gap-2 mt-[3rem] " onSubmit={handleSubmit}>
            <Input
              label={"Email Address"}
              icon="email"
              isError={emailError}
              onChange={(e) => {
                emailRef.current = e.target.value;
              }}
              inputProps={{ placeholder: "Email address" }}
              className={`min-w-[25.1rem]`}
            ></Input>
            {emailError && (
              <p className="text-mainRed text-fs-300 pt-3">{emailError}</p>
            )}
            <Button className={`min-w-[25.1rem] mt-[1.5rem] mb-[0.6rem]`}>
              Submit
            </Button>
          </form>

          <button className="flex gap-1">
            <Icon
              icon="arrow-left"
              className={`shrink-0 stroke-primaryColor`}
            />
            <p onClick={goBack} className="text-primaryColor text-fs-400">
              Go back
            </p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default RegisterInfoPage;
