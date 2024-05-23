const ProjectStatus = ({ status }) => {
  return (
    <div
      className={`rounded-md w-[120px] py-2 text-center font-medium text-fs-300  ${
        status === "pending"
          ? "bg-lightPending text-mainPending"
          : status === "refused"
          ? "bg-lightRed text-mainRed"
          : status === "accepted"
          ? "bg-lightGreen text-mainGreen"
          : status === "recourse"
          ? "bg-lightRecourse text-mainRecourse"
          : "bg-secondBgColor "
      }`}
    >
      {status}
    </div>
  );
};

export default ProjectStatus;
