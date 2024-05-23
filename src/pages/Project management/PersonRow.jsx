import { Icon } from "../../components/Globals";
import profile from "../../assets/Project management/profile.png";

const PersonRow = ({ email, handleDelete, index, isDelete, pic }) => {
  return (
    <ul className=" flex  items-center justify-between text-fs-400 text-secondaryColor py-2">
      <li className=" flex gap-4 items-center ">
        <div>
          <img
            src={pic ? pic : profile}
            className={`w-10 h-10 rounded-full object-cover`}
          />
        </div>
        <div className="self-center overflow-hidden whitespace-nowrap overflow-ellipsis ">
          <input
            type="text"
            disabled={true}
            value={email}
            className="bg-transparent w-[20rem]"
          />
        </div>
      </li>
      {!isDelete && (
        <li
          onClick={() => {
            handleDelete(index);
          }}
        >
          <Icon
            icon={"trash"}
            className={"stroke-primaryColor hover:cursor-pointer"}
          />
        </li>
      )}
    </ul>
  );
};

export default PersonRow;
