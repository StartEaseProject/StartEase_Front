import { Icon } from "../../components/Globals";
import { useState } from "react";

const EditProfilePic = ({ className, user, handleImage, image }) => {
  const [file, setFile] = useState(null);
  const handlePicture = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    handleImage(selectedFile);
  };
  return (
    <div>
      <div className={`flex gap-4 items-center ` + className}>
        <div className="flex justify-center items-center w-[78px] h-[76px] relative">
          {file && (
            <img
              src={URL.createObjectURL(file)}
              alt="Selected Image"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          {image && !file && (
            <img
              src={URL.createObjectURL(image)}
              alt="Selected Image"
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          {!file && !image && (
            <img
              src={user?.photo_url}
              className="w-20 h-20 rounded-full object-cover"
            />
          )}

          <label
            htmlFor="file-upload"
            className="flex justify-center items-center rounded-full absolute w-5 h-5 border-[1px]
              bg-primaryColor top-[70%] left-[70%] hover:cursor-pointer"
          >
            <Icon
              icon="edit-2"
              className="fill-transparent stroke-bgColor
                group-hover:stroke-white shrink-0 duration-500 w-[11px]"
            />

            <input
              onChange={handlePicture}
              id="file-upload"
              type="file"
              className="hidden appearance-none"
            />
          </label>
        </div>
        <ul>
          <li className="text-thirdColor text-fs-400">
            Update your profile picture
          </li>
        </ul>
      </div>
    </div>
  );
};
export default EditProfilePic;
