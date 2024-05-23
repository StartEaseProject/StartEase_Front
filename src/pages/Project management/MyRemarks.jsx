import { Remark } from "../../components/Globals";
import { useState, useEffect } from "react";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";

const MyRemarks = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [remarks, setRemarks] = useState([]);
  const fetchData = async () => {
    try {
      const res = await API.get(`/remarks/project/${id}`);
      setRemarks(res.data.data.remarks);
      setLoading(false);
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
      {!loading && (
        <section className="px-layout pb-8">
          <div className="text-secondaryColor text-fs-400 font-medium">
            Project remarks
          </div>
          <p className="text-fs-300 text-thirdColor max-w-[26rem] pt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <ul className="py-8">
            {remarks.map((remark, index) => {
              return (
                <Remark
                  key={index}
                  index={index}
                  isAdmin={false}
                  name={
                    remark.user.person.first_name +
                    " " +
                    remark.user.person.last_name
                  }
                  time={remark.created_at}
                  remark={remark.content}
                  pic={remark.user.photo_url}
                  edit={remark.updated_at}
                />
              );
            })}
          </ul>
        </section>
      )}
    </>
  );
};

export default MyRemarks;
