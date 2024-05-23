import { useState } from "react";
import InternshipInfoPage from "./InternshipInfo";
import ConfirmNumberPage from "./ConfirmNumber";
import CreatePasswordPage from "./CreatePassword";
import { Timeline } from "../../components/Globals";

const RegisterInternshipPage = ({ user, grades, handleUser, type }) => {
  const [index, setIndex] = useState(1);
  const advance = () => setIndex((index) => index + 1);
  const goBack = () => setIndex((index) => index - 1);

  return (
    <>
      <div className="px-[4rem] pt-[3.5rem]">
        <h2 className="text-fs-700 text-secondaryColor mb-[1.9rem]">
          Complete Registration
        </h2>
        <Timeline currentStep={index} total={3} />
      </div>
      {index === 1 && (
        <InternshipInfoPage
          type={type}
          grades={grades}
          handleUser={handleUser}
          advance={advance}
          user={user}
        />
      )}
      {index === 2 && (
        <ConfirmNumberPage
          advance={advance}
          goBack={goBack}
          user={user}
          handleUser={handleUser}
        />
      )}
      {index === 3 && <CreatePasswordPage user={user} goBack={goBack} />}
    </>
  );
};

export default RegisterInternshipPage;
