import { routes } from "../../routes";
import logo from "../../assets/globals/logo.svg";
import { Button, Icon } from "../../components/Globals";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import teacherPic from "../../assets/Registration/teacher.jpg";
import studentPic from "../../assets/Registration/student.png";

const ChooseTypePage = ({ advance, handleUser }) => {
  const [btnState, setBtnState] = useState(true);
  const navigate = useNavigate();

  function handleBack() {
    navigate(routes.LOGIN.path);
  }

  function handleNext() {
    advance();
  }

  function handleClickStudent() {
    handleUser("student");
    if (!student) {
      setBtnState((btnState) => !btnState);
    }
  }

  function handleClickTeacher() {
    handleUser("teacher");
    if (!teacher) {
      setBtnState((btnState) => !btnState);
    }
  }

  let student = btnState;
  let teacher = !btnState;

  return (
    <section className="relative bg-bgColor min-h-screen">
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
          <div className="min-w-[30rem] flex justify-evenly mt-[1.5rem] mb-[1.8rem]">
            <button
              onClick={handleClickStudent}
              className={`text-fs-400 py-[0.5rem] flex flex-col items-center rounded-[5px] border-2 min-w-[10.3rem] h-[9.5rem] text-center ${
                student ? "border-primaryColor" : "border-grey"
              }`}
            >
              <img src={studentPic} alt="student" className=" h-[6rem]" />
              <p>Student</p>
            </button>
            <button
              onClick={handleClickTeacher}
              className={`text-fs-400 py-[0.5rem] flex flex-col items-center rounded-[5px] border-2 min-w-[10.3rem] h-[9.5rem] text-center ${
                teacher ? "border-primaryColor" : "border-grey"
              }`}
            >
              <img src={teacherPic} alt="teacher" className="h-[6rem]" />

              <p>Teacher</p>
            </button>
          </div>
          <Button
            className={`min-w-[25.1rem] mb-[0.6rem]`}
            onClick={handleNext}
          >
            Next
          </Button>
          <button className="flex gap-1" onClick={handleBack}>
            <Icon
              icon="arrow-left"
              className={`shrink-0 stroke-primaryColor`}
            />
            <p className="text-primaryColor text-fs-400">Go back to login</p>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ChooseTypePage;
