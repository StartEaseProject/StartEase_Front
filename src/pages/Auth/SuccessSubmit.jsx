import Lottie from "lottie-react";
import { routes } from "../../routes";
import done from "../../assets/globals/done.json";
import { useNavigate } from "react-router-dom";
import { Icon } from "../../components/Globals";

const SuccessSubmit = () => {
  const navigate = useNavigate();

  function handleBack() {
    navigate(routes.LOGIN.path);
  }

  return (
    <section className="relative bg-bgColor min-h-screen">
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2  px-10  ">
        <div
          className="rounded-tl-lg rounded-tr-lg px-6 shadow-default mx-auto grid justify-items-center gap-4 
      bg-white min-w-[46.25rem] py-8 "
        > 
        <div className="pt-4">
          <Lottie animationData={done} loop={true} style={{ height: 200 }} />

        </div>
          <div className="flex flex-col items-center mt-[2rem] mb-[7rem]">
            <h3 className="text-fs-700 text-secondaryColor">Success !</h3>
            <p className="text-fs-400 text-thirdColor">
              A link is sent to your email, please check your email.
            </p>
          </div>
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
export default SuccessSubmit;
