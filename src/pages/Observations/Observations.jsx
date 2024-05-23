import { useState, useEffect } from "react";
import Observation from "./Observation";
import { useParams } from "react-router-dom";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";
import API from "../../utils/api-client";

const Observations = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [observations, setObservations] = useState([]);
  const fetchData = async () => {
    try {
      const res = await API.get(`/projects/${id}/progress`);
      setObservations(Object.entries(res.data.data.progress).map(([key, value]) => ({ key, value })));
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
      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          Observations
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[26rem] pt-2">
          These are the observations of this project. When updating the
          progress, the supervisor can add an observation.
        </p>
        <ul className="flex flex-col gap-4 pt-4">
          {observations.map((observation, index) => {
            return <Observation key={index} value={parseInt(observation.key)} description={observation.value} />;
          })}
        </ul>
      </section>
    </>
  );
};

export default Observations;
