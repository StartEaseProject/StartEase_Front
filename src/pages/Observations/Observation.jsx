const Observation = ({value,description}) => {
  return (
    <>
      <li className="shadow-custom bg-white text-secondaryColor p-8 w-[30rem] rounded-lg">
        <h3>Observation description</h3>
        <p className="text-thirdColor text-fs-400 pt-2 pb-4">
          {description}
        </p>
        <h3>Project advancement</h3>
        <div className="grid grid-flow-col gap-3 pb-4 pt-2">
          <div className="bg-bgColor w-[22rem] h-3 rounded-lg self-center">
            <div style={{width: `${value/100*22}rem`}} className="bg-primaryColor  h-3 rounded-lg" />
          </div>
          <div className="self-center justify-self-center text-secondaryColor inline-block">
            {value} %
          </div>
        </div>
        <p className="text-thirdColor flex justify-end pt-4">Date : 2/2/2003</p>
      </li>
    </>
  );
};

export default Observation;
