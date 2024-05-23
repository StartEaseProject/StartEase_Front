import { useInView } from "react-intersection-observer";

const Guid = ({ number, title, text, src }) => {
  const [ref, inView] = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.5, // Adjust this threshold value as needed
  });
  return (
    <>
      <div
        ref={ref}
        className={`overflow-hidden ${
          number % 2 == 0
            ? "flex flex-row-reverse justify-around"
            : "flex justify-around"
        }  `}
      >
        <img src={src || ""}
          className={`overflow-hidden duration-1000 ${
            inView
              ? "translate-x-0 opacity-100"
              : number % 2 == 0
              ? "translate-x-60 opacity-0 "
              : "-translate-x-60 opacity-0 "
          } w-[30%] h-[15rem] bg-bgColor rounded-xl mt-8`}
          
        />
        <div className="flex flex-col justify-center items-center">
          <div
            className={`duration-700  ${
              inView ? "bg-primaryColor" : "bg-thirdColor"
            }  h-10 w-10 rounded-full text-white text-fs-500 flex justify-center items-center`}
          >
            {number}
          </div>
          <div
            className={`duration-700  h-[16rem] w-[1.8px] ${
              inView ? "bg-primaryColor" : "bg-thirdColor"
            } my-3 rounded-full`}
          />
        </div>
        <div
          className={`overflow-hidden duration-1000 ${
            inView
              ? "translate-x-0 opacity-100"
              : number % 2 == 0
              ? "-translate-x-60 opacity-0 "
              : "translate-x-60 opacity-0 "
          } flex flex-col gap-4 w-[30%] mt-8`}
        >
          <div className="text-secondaryColor font-medium text-fs-600">
            {title}
          </div>
          <p className="text-thirdColor text-fs-400">{text}</p>
        </div>
      </div>
    </>
  );
};

export default Guid;
