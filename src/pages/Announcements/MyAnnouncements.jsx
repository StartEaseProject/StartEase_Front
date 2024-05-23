import AnnouncementCard from "../../components/Announcement/AnnouncementCard";
import { useState, useEffect } from "react";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";
import { LoadingAnimation } from "../../components/Globals";

const AnnouncementManagement = () => {
  const [loading, setLoading] = useState(false);
  const { auth } = useAuth();
  const [error, setError] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [success, setSuccess] = useState("");
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/announcements/private`);
      setAnnouncements(res.data.data.announcements);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  };
  const handleDelete = async (index, id) => {
    try {
      setLoading(true);
      const res = await API.delete(`/announcements/${id}`);
      setAnnouncements((prevItems) => {
        return prevItems.filter((_, itemIndex) => itemIndex !== index);
      });
      setLoading(false);
      setSuccess(res.data.message);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingAnimation className="scale-[0.5]" />}
      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          Establishment Announcements
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
          You find here all the announcements of your establishement.
        </p>
        <ul className="flex flex-col gap-[2rem]  mt-8">
          {announcements.map((announcement, index) => {
            return (
              <AnnouncementCard
                isEdit={auth.permissions.find(
                  (e) => e.name === 'update-announcement'
                ) ? true : false}
                key={index}
                id={announcement.id}
                location={announcement.location}
                title={announcement.title}
                description={announcement.description}
                type={announcement.type}
                date={announcement.date}
                startDate={announcement.start_date}
                endDate={announcement.end_date}
                imageAnnoun={announcement.photo}
                className={`self-start`}
                index={index}
                handleDelete={handleDelete}
              />
            )
          })}
        </ul>
      </section>
    </>
  );
};

export default AnnouncementManagement;
