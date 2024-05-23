import { Input, DateInput } from "../../components/Globals";
import { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext";
import { useParams } from "react-router-dom";
import API from "../../utils/api-client";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";

const ViewAnnouncement = () => {
  const { auth } = useAuth();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [photo, setPhoto] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/announcements/${id}`);
      setLocation(res.data.data.announcement.location);
      setTitle(res.data.data.announcement.title);
      setDescription(res.data.data.announcement.description);
      setType(res.data.data.announcement.type);
      setDate(res.data.data.announcement.date);
      setStartDate(res.data.data.announcement.start_date);
      setEndDate(res.data.data.announcement.end_date);
      setPhoto(res.data.data.announcement.photo);
      console.log(res.data.data.announcement);
      console.log(id);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          View Announcement
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
          Here are the announcement details.
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
              label={"Place"}
              inputProps={{
                value: location,
                disabled: true,
              }}
              icon="location"
              className={`max-w-[22.7rem]`}
            />
            <Input
              label={"Title"}
              inputProps={{
                value: title,
                disabled: true,
              }}
              icon="note-2"
              className={`max-w-[22.7rem]`}
            />
            {type == "single day" && (
              <DateInput value={date} label={"Date"} icon={"calendar"} />
            )}
            {type == "period" && (
              <DateInput
                value={startDate}
                label={"Start Time"}
                icon={"calendar"}
              />
            )}
            {type == "period" && (
              <DateInput value={endDate} label={"End Time"} icon={"calendar"} />
            )}
            <div>
              <div>
                <div className="text-thirdColor text-fs-400 pt-4">
                  Description
                </div>
                <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2"></p>
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
                  disabled={true}
                  value={description}
                  rows={5}
                  className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                />
                <span className={` absolute bottom-0 right-10`}></span>
              </div>
            </div>
          </div>

          <div className="grid gap-[1.12rem] max-w-[22.7rem] mt-[2.5rem] flex-grow">
            <div className="justify-self-start border-[3px] border-dashed border-primaryColor h-[17rem] w-[90%] rounded-md flex flex-col items-center justify-center">
              <img src={photo} alt="Selected Image" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewAnnouncement;
