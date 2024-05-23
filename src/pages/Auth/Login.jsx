import logo from "../../assets/globals/logo.svg";
import {
  Input,
  LoadingAnimation,
  PasswordInput,
  Button,
} from "../../components/Globals";
import { ErrorToast } from "../../components/Globals/toasts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../AuthContext";
import { routes } from "../../routes";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  window.history.replaceState({}, document.title);
  const [error, setError] = useState(state?.error);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const { authenticate } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    let err = false;
    if (emailRef.current.trim() == "") {
      setEmailError("Email is required");
      err = true;
    }
    if (passwordRef.current.trim() == "") {
      setPasswordError("Password is required");
      err = true;
    }
    if (!err) {
      setLoading(true);
      const res = await authenticate(emailRef.current, passwordRef.current);
      setLoading(false);
      if (res.success) {
        navigate(routes.PROFILE.path);
        return;
      }
      if (!res.errors) {
        setError(res.error);
        return;
      }
      setEmailError(res.errors.email);
      setPasswordError(res.errors.password);
    }
  };

  return (
    <section className="relative bg-bgColor min-h-screen  ">
      {error && <ErrorToast message={error} />}
      <div
        onClick={() => {
          setEmailError(null);
          setPasswordError(null);
        }}
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2  px-10  "
      >
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
          <form className="grid" onSubmit={handleSubmit}>
            <Input
              label={"Email"}
              icon="email"
              isError={emailError}
              onChange={(e) => {
                emailRef.current = e.target.value;
              }}
              inputProps={{ placeholder: "Email address" }}
            />
            {emailError && (
              <p className="text-mainRed text-fs-300 pt-3">{emailError}</p>
            )}
            <PasswordInput
              label={"Password"}
              isError={passwordError}
              className={"pt-5"}
              onChange={(e) => {
                passwordRef.current = e.target.value;
              }}
              inputProps={{ placeholder: "Password" }}
            />
            {passwordError && (
              <p className="text-mainRed text-fs-300 pt-[1px]">
                {passwordError}
              </p>
            )}
            <div
              className="pb-8 pt-4 self-end justify-end justify-self-end text-primaryColor 
              text-fs-400 hover:cursor-pointer"
            >
              <Link to={routes.RESET.path}>Forgot password ?</Link>
            </div>
            {loading ? (
              <LoadingAnimation className="w-[52px] scale-[2] mx-auto" />
            ) : (
              <Button>Sign In</Button>
            )}
            <div className="text-secondaryColor justify-self-center pt-3">
              Doesn't have an account ?<span onClick={()=>{
                navigate(routes.REGISTER.path)
              }} className="text-primaryColor hover:cursor-pointer"> Register here </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
