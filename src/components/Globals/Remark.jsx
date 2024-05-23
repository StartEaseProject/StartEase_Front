import Icon from "./Icon";
import { useState } from "react";
import { useRef, useEffect } from "react";

const Remark = ({
  canAdd,
  old_remark,
  isAdmin,
  remark,
  name,
  time,
  handleDelete,
  handleSubmit,
  index,
  pic,
  edit,
}) => {
  const textareaRef = useRef(null);

  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [r, setR] = useState(remark);
  const [temp, setTemp] = useState(remark);
  const toggleEdit = () => {
    setOpen(false);
    setEdit(true);
  };
  function handleChange(event) {
    setR(event.target.value);
  }
  function adjustRows() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const height =
        textarea.scrollHeight -
        parseInt(getComputedStyle(textarea).paddingTop) -
        parseInt(getComputedStyle(textarea).paddingBottom) -
        parseInt(getComputedStyle(textarea).borderTopWidth) -
        parseInt(getComputedStyle(textarea).borderBottomWidth);
      textarea.style.height = height + "px";
    }
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".remark-container") &&
        event.target !== textareaRef.current
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    adjustRows();
  }, [r]);

  return (
    <div className="flex gap-4 py-4">
      <img
        src={pic}
        alt="profile pic"
        className="h-16 w-16 rounded-full object-cover"
      />
      <ul className="flex justify-between min-w-[22rem]">
        <li className="flex flex-col relative">
          <div className="text-fs-300 text-thirdColor max-w-[22rem]">
            {name}
          </div>
          <div>
            <textarea
              ref={textareaRef}
              onInput={adjustRows}
              rows={1}
              onChange={handleChange}
              className={` bg-transparent border-none w-[20rem] overflow-hidden  focus:outline-0 resize-none`}
              value={r}
              disabled={!isEdit}
            />
          </div>
          {isEdit && (
            <button
              onClick={async () => {
                if (r.trim().length > 5) {
                  await handleSubmit(index, old_remark, r.trim());
                  setTemp(r.trim());
                  setR(r.trim());
                  setEdit(false);
                  adjustRows();
                }
              }}
              className="absolute bottom-0 text-primaryColor text-fs-300 right-0"
            >
              Save
            </button>
          )}
          {isEdit && (
            <button
              onClick={() => {
                setEdit(false);
                setR(temp.trim());
                adjustRows();
              }}
              className="absolute bottom-0 text-primaryColor text-fs-300 right-12"
            >
              Cancel
            </button>
          )}
          <div className="text-fs-200 text-thirdColor">
            {edit ? `edited ${edit}` : time}
          </div>
        </li>

        {isAdmin && (
          <li className="remark-container">
            <section className="relative">
              <Icon
                onClick={() => {
                  setOpen(!isOpen);
                }}
                icon={"more"}
                className={"stroke-primaryColor hover:cursor-pointer"}
              />
              {isOpen && (
                <div className="absolute top-5 w-[8rem] z-10">
                  <div className="bg-bgColor rounded-md">
                    <ul
                      onClick={toggleEdit}
                      className="hover:bg-secondBgColor py-3 flex rounded-md gap-4 px-4 hover:cursor-pointer"
                    >
                      <li>
                        <Icon
                          icon={"edit"}
                          className={"stroke-secondaryColor h-5"}
                        />
                      </li>
                      <li>Edit</li>
                    </ul>
                    <ul
                      onClick={async () => {
                        const confirmDelete = window.confirm(
                          "Are you sure you want to delete this remark?"
                        );
                        if (confirmDelete) {
                          await handleDelete(index,old_remark.id);
                          setOpen(false);
                        } else {
                          setOpen(false);
                        }
                      }}
                      className="hover:bg-secondBgColor py-3 flex rounded-md gap-4 px-4 hover:cursor-pointer"
                    >
                      <li>
                        <Icon
                          icon={"trash"}
                          className={"stroke-secondaryColor h-[23px]"}
                        />
                      </li>
                      <li>Delete</li>
                    </ul>
                  </div>
                </div>
              )}
            </section>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Remark;
