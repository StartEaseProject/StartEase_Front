import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const CountCard = ({ name, number }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.2, // Adjust this threshold value as needed
  });
  return (
    <>
      <div
        ref={ref}
        className=" w-[200px] h-[200px] LinkBox p-5 flex flex-col justify-center items-center gap-5
                rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:bg-primaryColor
                hover:text-white hover:scale-105"
      >
        <div className=" py-8 hover:text-white text-center hover:cursor-default">{name}</div>

        <div className="text-center max-w-[70%]">
          {inView && <CountUp end={number} duration={2} />}
        </div>
      </div>
    </>
  );
};

export default CountCard;
