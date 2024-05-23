const Steps = ({ className, step2Color, step3Color }) => {
  return (
    <ul className={`flex list-none ` + className}>
      <li
        className={
          `relative min-w-[11rem] after:content-[''] after:absolute after:w-[100%] after:h-[2px] after:top-[50%] after:z-[-10] after:translate-y-[-50%] after:` +
          step2Color
        }
      >
        <span
          className={`flex justify-center items-center text-white rounded-full w-7 h-7 bg-primaryColor `}
        >
          1
        </span>
      </li>
      <li
        className={
          `relative min-w-[11rem] after:content-['']  after:absolute after:w-[100%] after:h-[2px] after:top-[50%] after:z-[-10] after:translate-y-[-50%] after:` +
          step3Color
        }
      >
        <span
          className={
            `flex justify-center items-center text-white rounded-full w-7 h-7 ` +
            step2Color
          }
        >
          2
        </span>
      </li>
      <li>
        <span
          className={
            `flex justify-center items-center text-white rounded-full w-7 h-7 ` +
            step3Color
          }
        >
          3
        </span>
      </li>
    </ul>
  );
};

export default Steps;
