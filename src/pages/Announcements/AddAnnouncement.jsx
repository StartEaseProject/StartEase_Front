import { Input, Button, DateInput } from "../../components/Globals";
import { DropDownMenu } from "../../components/Globals";
import { useState } from "react";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";

const AddAnnouncement = () => {
  const { auth } = useAuth();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [wordCount, setWordsCount] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [visibility, setVisibility] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [displayPeriod, setDisplayPeriod] = useState("");
  const [displayDay, setDisplayDay] = useState("");
  const MAX_WORDS = 100;
  const currentDate = new Date();

  function handleChangeDescription(event) {
    if (event.target.value.trim().split(/\s+/).length <= MAX_WORDS) {
      setDescription(event.target.value);
      let count =
        event.target.value === ""
          ? 0
          : event.target.value.trim().split(/\s+/).length;
      setWordsCount(count);
    }
  }
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };
  const handleChangeVisibility = (value) => {
    setVisibility(value);
  };
  const handleChangeType = (value) => {
    setType(value);
    if (value == "period") {
      setDisplayPeriod(true);
      setDisplayDay(false);
    } else if (value == "single day") {
      setDisplayDay(true);
      setDisplayPeriod(false);
    }
  };
  const handleChangeDate = (e) => {
    setDate(e.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };
  const handleChangeStart = (e) => {
    setStart(e.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };
  const handleChangeEnd = (e) => {
    setEnd(e.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };

  const handleSubmit = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("type", type);
      formData.append("visibility", visibility);
      if (type == "period") {
        formData.append("start_date", start);
        formData.append("end_date", end);
      } else if (type == "single day") {
        formData.append("date", date);
      }
      formData.append("photo", image);
      const res = await API.post(`/announcements`, formData);
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      {success && <SuccessToast message={success} />}
      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          Create Announcement
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
          In order to create an announcement, please provide all required
          informations. The announcement can either be of type single day or
          period. If the type is single day, enter the date only. If the type is
          period, please enter the start and end dates only.
        </p>
        <div className="flex gap-[17rem] items-start">
          <div className="grid gap-[1.12rem] max-w-[22.7rem] mt-[2.5rem]">
            <Input
              label={"Establishement"}
              inputProps={{
                value: auth?.person?.establishment?.name,
                disabled: true,
              }}
              icon="house"
              className={`max-w-[22.7rem]`}
            />
            <Input
              label={"Title"}
              inputProps={{
                placeholder: "Title",
              }}
              icon="note-2"
              className={`max-w-[22.7rem]`}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div>
              <div>
                <div className="text-thirdColor text-fs-400 pt-4">
                  Description
                </div>
                <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
                  Please provide a description for the announcement.
                </p>
              </div>
            </div>
            <div
              className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
            >
              <div className="relative w-full">
                <textarea
                  onChange={handleChangeDescription}
                  placeholder="Description..."
                  rows={5}
                  className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                />
                <span
                  className={` absolute bottom-0 right-10 ${
                    wordCount > MAX_WORDS ? "text-mainRed" : "text-thirdColor"
                  }`}
                >
                  {wordCount} - {MAX_WORDS} words
                </span>
              </div>
            </div>
            <div>
              <div className="text-thirdColor text-fs-400 pt-7">
                Add picture
              </div>
              <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
                Please select a picture for this annoucement.
              </p>
            </div>

            <label
              htmlFor="file-upload"
              className="justify-self-start border-[3px] border-dashed border-primaryColor h-[17rem] w-[90%] rounded-md flex flex-col items-center justify-center hover:cursor-pointer"
            >
              {!image && (
                <div>
                  <h6 className="text-primaryColor flex-grow">Add picture</h6>
                  <p className="text-thirdColor text-center">Upload</p>
                </div>
              )}

              {image && (
                <img
                  src={image ? URL.createObjectURL(image) : null}
                  alt="Selected Image"
                  className="object-cover"
                />
              )}
              <input
                onChange={handleImage}
                id="file-upload"
                type="file"
                className="hidden appearance-none"
              />
            </label>
          </div>
          <div className="grid gap-[1.12rem] max-w-[22.7rem] mt-[2.5rem] flex-grow">
            <DropDownMenu
              label="Announcement Visibility"
              title="Select announcement visibility"
              icon="setting-2"
              list={["public", "private"]}
              iconColor={"stroke-thirdColor"}
              isEdit={true}
              handleChange={handleChangeVisibility}
            />
            <DropDownMenu
              label="Announcement Type"
              title="Select announcement type"
              icon="setting-2"
              list={["single day", "period"]}
              iconColor={"stroke-thirdColor"}
              isEdit={true}
              handleChange={handleChangeType}
            />
            <Input
              label={"Place"}
              inputProps={{
                placeholder: "Place...",
              }}
              icon="location"
              className={`max-w-[22.7rem]`}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />

            {displayDay && (
              <DateInput
                min={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()
                  )
                }
                max={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 6,
                    currentDate.getDate()
                  )
                }
                label={"Date"}
                icon={"calendar"}
                handleChange={handleChangeDate}
              />
            )}
            {displayPeriod && (
              <DateInput
                min={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()
                  )
                }
                max={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 6,
                    currentDate.getDate()
                  )
                }
                label={"Start Time"}
                icon={"calendar"}
                handleChange={handleChangeStart}
              />
            )}
            {displayPeriod && (
              <DateInput
                value={null}
                min={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()
                  )
                }
                max={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth() + 6,
                    currentDate.getDate()
                  )
                }
                label={"End Time"}
                icon={"calendar"}
                handleChange={handleChangeEnd}
              />
            )}
            <Button className={"mt-10"} onClick={handleSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddAnnouncement;
