import { PasswordInput, Button, Icon } from "../../components/Globals";
import { useState } from "react";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CreatePasswordPage = ({ user, goBack }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const formData = new FormData();
      for (const key in user) {
        if (key === "image") {
          formData.append("image", user[key]);
        } else {
          formData.append(key, user[key]);
        }
      }
      formData.append("password", password);
      formData.append("confirm_password", confirmPassword);
      const res = await API.post(`register/complete/${id}`, formData);
      setLoading(false);
      setSuccess(res.data.message);
      await sleep(4000);
      navigate("/login");
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  };
  return (
    <>
      {success && <SuccessToast message={success} />}
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      <div className="px-[4rem] py-[3.5rem]">
        <div className="mb-[2.6rem]">
          <div>
            <h3 className="text-fs-400 text-secondaryColor mb-[0.4rem]">
              Password
            </h3>
            <p className="text-fs-300 text-thirdColor">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>

        <div className="max-w-[365px]">
          <PasswordInput
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={"pb-4"}
            label={"Password"}
            inputProps={{
              placeholder: "Password",
            }}
          />
          <PasswordInput
            onChange={(e) => {
              setConfirm(e.target.value);
            }}
            className={"pb-7"}
            label={"Confirm Password"}
            inputProps={{
              placeholder: "Confirm password",
            }}
          />
          <div className="flex flex-col ">
            <Button onClick={handleSubmit}>Submit</Button>
            <button onClick={goBack} className="text-primaryColor  pt-4">
              Back
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePasswordPage;
