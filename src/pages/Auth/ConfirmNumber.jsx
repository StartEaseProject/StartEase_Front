import { Input, Button } from "../../components/Globals";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useState } from "react";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";
const ConfirmNumberPage = ({ advance, goBack, handleUser, user }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  async function handleNext() {
    try {
      setLoading(true);
      await API.post(`register/phonenumber/otp/${id}`, {
        verif_code: confirm,
      });
      setLoading(false);
      handleUser({ ...user, phone_number: phone });
      advance();
    } catch (e) {
      setError(e.response.data.message);
      setLoading(false);
    }
  }

  const sendVerification = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const res = await API.post(`register/phonenumber/${id}`, {
        phone_number: phone,
      });
      setSuccess(res.data.message);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  };

  return (
    <>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      <div className="px-[4rem] py-[3.5rem]">
        <div className="mb-[2.6rem]">
          <div>
            <h3 className="text-fs-400 text-secondaryColor mb-[0.4rem]">
              Phone Number
            </h3>
            <p className="text-fs-300 text-thirdColor">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </p>
          </div>
        </div>

        <div className={`flex flex-col grow gap-3 max-w-[365px] `}>
          <h3 className="text-thirdColor">Phone Number</h3>
          <div className="flex flex-col gap-[22px]">
            <div className="relative flex">
              <Input
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="grow"
                icon="call"
                inputProps={{
                  placeholder: "Phone number",
                }}
              />
              <button
                onClick={sendVerification}
                className="text-primaryColor absolute self-center right-3 font-medium"
              >
                send
              </button>
            </div>
            <Input
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
              inputProps={{
                placeholder: "Sms code",
                type: "number",
              }}
              icon="key-square"
            />
          </div>
          <p className="text-fs-300 text-thirdColor mb-5">
            Click on send then provide the pin number .
          </p>
          <div className="flex gap-8">
            <Button onClick={handleNext} className="max-w-[364px]">
              Next
            </Button>
            <button onClick={advance} className="text-primaryColor">
              Skip
            </button>
          </div>

          <button onClick={goBack} className="text-primaryColor">
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default ConfirmNumberPage;
