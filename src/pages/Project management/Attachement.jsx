import { Icon } from "../../components/Globals";
import pdf from "../../assets/Project management/PDF_file_icon.svg";
import { useState } from "react";

const Attachment = ({
  id,
  title,
  filePath,
  isEdit,
  isDownload,
  isUpload,
  name,
  handleDelete,
  index,
  handleUpload
}) => {
  const [file, setFile] = useState(null);
  return (
    <>
      {title && (
        <div className="text-secondaryColor text-fs-400 py-2">{title}</div>
      )}
      <div className="flex justify-between text-thirdColor items-center text-fs-300 hover:cursor-pointer border-2 border-dashed rounded-lg px-4 py-3 ">
        <div className="flex gap-4">
          <img src={pdf} alt="pdf" className="h-5" />
          {!isUpload && (
            <a href={filePath} target="_blank" rel="noopener noreferrer">
              <p className="truncate w-[15rem]">{name}</p>
            </a>
          )}
          {isUpload && (
            <a
              href={file && URL.createObjectURL(file)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <p className="truncate w-[15rem]">{file?.name}</p>
            </a>
          )}
        </div>
        {isEdit && (
          <div
            onClick={() => {
              handleDelete(index);
            }}
          >
            <Icon
              icon={"trash"}
              className={"stroke-primaryColor hover:cursor-pointer"}
            />
          </div>
        )}
        {isDownload && (
          <a href={filePath} target="_blank" rel="noopener noreferrer">
            {" "}
            <div className="text-primaryColor hover:cursor-pointer">
              Download
            </div>
          </a>
        )}
        {isUpload && (
          <>
            <label htmlFor={id}>
              <div className="text-primaryColor hover:cursor-pointer">
                Upload
              </div>
            </label>
            <input
              type="file"
              id={id}
              accept="application/pdf"
              onChange={(e) => {
                setFile(e.target.files[0]);
                handleUpload(e.target.files[0],title,index)
              }}
              className="hidden "
            />
          </>
        )}
      </div>
    </>
  );
};

export default Attachment;
