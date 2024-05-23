import { Link } from "react-router-dom";

export const SoutenanceRow = ({ trademark, date, nature, mode, link }) => {
  return (
    <div className="py-3 w-full hover:bg-bgColor">
      <div className="pl-[30px] grid grid-cols-5 gap-3 items-center text-fs-300">
        <div className="self-center overflow-hidden whitespace-nowrap overflow-ellipsis text-secondaryColor">
          {trademark}
        </div>

        <div className="text-thirdColor overflow-hidden whitespace-nowrap overflow-ellipsis">
          {date}
        </div>
        <div className="text-thirdColor overflow-hidden whitespace-nowrap overflow-ellipsis">
          {mode}
        </div>
       <div className="text-thirdColor overflow-hidden whitespace-nowrap overflow-ellipsis">
          {nature}
        </div>
        <div className="text-primaryColor font-medium hover:cursor-pointer hover:underline pl-8">
          <Link to={`/main-menu/thesis-management/${link}`}>View</Link>
        </div>
      </div>
    </div>
  );
};

