import { Input, Button, DateInput } from "../../components/Globals";
import { DropDownMenu } from "../../components/Globals";
import { useState, useEffect } from "react";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";
import { useParams } from "react-router-dom";

const UpdateAnnouncement = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("");
  const [type, setType] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [photo, setPhoto] = useState("");
  const [defaultPhoto, setDefaultPhoto] = useState("");

  const [displayPeriod, setDisplayPeriod] = useState("");
  const [displayDay, setDisplayDay] = useState("");

  const [wordCount, setWordsCount] = useState(0);
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
  const handleChangeDate = (e) => {
    setDate(e.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };
  const handleChangeStart = (e) => {
    setStartDate(e.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };
  const handleChangeEnd = (e) => {
    setEndDate(e.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };

  const handleChangeVisibility = (value) => {
    setVisibility(value);
  };
  const handleChangeType = (value) => {
    setType(value);
    if (type == "period") {
      setDisplayPeriod(true);
      setDisplayDay(false);
    } else if (type == "single day") {
      setDisplayDay(true);
      setDisplayPeriod(false);
    }
  };
  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/announcements/${id}`);
      setLocation(res.data.data.announcement.location);
      setTitle(res.data.data.announcement.title);
      setDescription(res.data.data.announcement.description);
      setVisibility(res.data.data.announcement.visibility);
      setType(res.data.data.announcement.type);
      setDate(res.data.data.announcement.date);
      setStartDate(res.data.data.announcement.start_date);
      setEndDate(res.data.data.announcement.end_date);
      setDefaultPhoto(res.data.data.announcement.photo);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    handleChangeType(type);
  }, [type]);

  const handleSubmit = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);
      const formData = new FormData();
      formData.append("_method", "put");
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("type", type);
      formData.append("visibility", visibility);
      if (type == "period") {
        formData.append("start_date", startDate);
        formData.append("end_date", endDate);
      } else if (type == "single day") {
        formData.append("date", date);
      }
      formData.append("photo", photo);
      console.log(formData);
      const res = await API.post(`/announcements/${id}`, formData);
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
      {(!loading || title) && (
        <section className="px-layout pb-8">
          <div className="text-secondaryColor text-fs-400 font-medium">
            Update Announcement
          </div>
          <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
            In order to update an announcement, please provide all required
            informations. The announcement can either be of type single day or
            period. If the type is single day, enter the date only. If the type
            is period, please enter the start and end dates only.
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
                  defaultValue: title,
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
                    you can update the description of the announcement.
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
                    defaultValue={description}
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
                <img
                  src={!photo ? defaultPhoto : URL.createObjectURL(photo)}
                  alt="Selected photo"
                  className="object-cover"
                />

                <input
                  onChange={handlePhoto}
                  id="file-upload"
                  type="file"
                  className="hidden appearance-none"
                />
              </label>
            </div>
            <div className="grid gap-[1.12rem] max-w-[22.7rem] mt-[2.5rem] flex-grow">
              <DropDownMenu
                label="Announcement Visibility"
                title={visibility}
                icon="setting-2"
                list={["private", "public"]}
                iconColor={"stroke-thirdColor"}
                isEdit={true}
                handleChange={handleChangeVisibility}
              />
              <DropDownMenu
                label="Announcement Type"
                title={type}
                icon="setting-2"
                list={["single day", "period"]}
                iconColor={"stroke-thirdColor"}
                isEdit={true}
                handleChange={handleChangeType}
              />
              <Input
                label={"Place"}
                inputProps={{
                  defaultValue: location,
                }}
                icon="location"
                className={`max-w-[22.7rem]`}
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
                  value={date}
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
                  value={startDate}
                  handleChange={handleChangeStart}
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
                  label={"End Time"}
                  icon={"calendar"}
                  value={endDate}
                  handleChange={handleChangeEnd}
                />
              )}
              <Button className={"mt-10"} onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default UpdateAnnouncement;
