import { useState } from "react";
import StudentInfoPage from "./StudentInfo";
import ConfirmNumberPage from "./ConfirmNumber";
import CreatePasswordPage from "./CreatePassword";
import { Timeline } from "../../components/Globals";

const RegisterStudentPage = ({
  user,
  establishment,
  filieres,
  spec,
  handleUser,
}) => {
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
        <StudentInfoPage
          advance={advance}
          user={user}
          establishment={establishment}
          filieres={filieres}
          spec={spec}
          handleUser={handleUser}
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
      {index === 3 && (
        <CreatePasswordPage user={user}  goBack={goBack}/>
      )}
    </>
  );
};

export default RegisterStudentPage;
