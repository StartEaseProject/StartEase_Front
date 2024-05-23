import { useState } from "react";
import ChooseTypePage from "./ChooseType";
import SubmitEmailPage from "./SubmitEmail";
import SuccessSubmit from "./SuccessSubmit";

const RegisterPage = () => {
  const [index, setIndex] = useState(1);
  const [user, setUser] = useState("student");
  const handleUser = (value) => setUser(value);
  const advance = () => setIndex((index) => index + 1);
  const goBack = () => setIndex((index) => index - 1);
  return (
    <>
      {index === 1 && (
        <ChooseTypePage advance={advance} handleUser={handleUser} />
      )}
      {index === 2 && (
        <SubmitEmailPage advance={advance} goBack={goBack} user={user} />
      )}
      {index === 3 && <SuccessSubmit />}
    </>
  );
};

export default RegisterPage;
