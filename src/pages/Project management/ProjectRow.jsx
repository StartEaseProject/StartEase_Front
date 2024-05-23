import { Link } from "react-router-dom";
import { ProjectStatus } from "../../components/Globals";

export const ProjectRow = ({ trademark, scientificName, type, status, link }) => {
  return (
    <div className="py-3 w-full hover:bg-bgColor">
      <div className="pl-[30px] grid grid-cols-5 gap-3 items-center text-fs-300">
        <div className="self-center overflow-hidden whitespace-nowrap overflow-ellipsis text-secondaryColor">
          {trademark}
        </div>

        <div className="text-thirdColor overflow-hidden whitespace-nowrap overflow-ellipsis">
          {scientificName}
        </div>
        <div className="text-thirdColor overflow-hidden whitespace-nowrap overflow-ellipsis">
          {type}
        </div>
        <div>
          <ProjectStatus status={status} />
        </div>

        <div className="text-primaryColor font-medium hover:cursor-pointer hover:underline pl-8">
          <Link to={link}>View</Link>
        </div>
      </div>
    </div>
  );
};

