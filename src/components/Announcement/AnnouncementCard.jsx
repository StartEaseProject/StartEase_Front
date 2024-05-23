import { useState, useEffect } from "react";
import { Icon } from "../Globals";
import { useNavigate } from "react-router-dom";

const AnnouncementCard = ({
  isEdit,
  id,
  establishement,
  location,
  title,
  description,
  imageAnnoun,
  type,
  date,
  startDate,
  endDate,
  className,
  handleDelete,
  index,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleEdit = () => {
    navigate(`${id}/edit`);
  };
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".annoucement-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);
  return (
    <li
      className={
        `w-[28rem] rounded-lg shadow-custom text-secondaryColor list-none ` +
        className
      }
    >
      <div className="flex flex-col gap-0 px-4 py-4 relative">
        {establishement && <h3>Establishement</h3>}
        {establishement && (
          <p className="text-thirdColor pb-2">{establishement}</p>
        )}
        <h3>Location</h3>
        <p className="text-thirdColor pb-2">{location}</p>
        <h3 className="pt-2">Title</h3>
        <p className="text-thirdColor pb-2">{title}</p>
        <h3 className="pt-2">Description</h3>
        <p className="text-thirdColor pb-2">{description}</p>
        <div className="flex justify-between pt-6">
          <button
            onClick={() => {
              navigate(`${id}/view`);
            }}
            className="text-primaryColor"
          >
            View more
          </button>
          {type == "single day" && <p className="text-thirdColor">{date}</p>}
          {type == "period" && (
            <p className="text-thirdColor">
             From &nbsp;{startDate}&nbsp; to &nbsp;{endDate}
            </p>
          )}
        </div>
        {isEdit && <section className="annoucement-container">
          <Icon
            icon="more"
            className="stroke-primaryColor absolute top-[5%] right-[5%] cursor-pointer"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
          {isOpen && (
            <div className="absolute top-[10%] right-[5%] w-[8rem] z-10">
              <div className="bg-bgColor rounded-md">
                <ul
                  onClick={handleEdit}
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
                  onClick={() => {
                    if (
                      confirm(
                        "Are you sure you want to delete this annoucement?"
                      )
                    ) {
                      handleDelete(index, id);
                      setIsOpen(false)
                    } else {
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
        </section>}
      </div>

      <img
        src={imageAnnoun}
        alt="image of the announcement"
        className="w-full rounded-b-lg"
      />
    </li>
  );
};

export default AnnouncementCard;
