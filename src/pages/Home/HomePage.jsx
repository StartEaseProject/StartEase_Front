import {
  HeroSection,
  Footer,
  Annoucement,
  GuidLine,
  Story,
} from "./index";
import API from "../../utils/api-client";
import { useEffect, useState } from "react";
import { ErrorToast } from "../../components/Globals/toasts";
import { LoadingAnimation } from "../../components/Globals";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [logos, setLogos] = useState([]);
  const [experts, setExperts] = useState([]);
  const [annoucements, setAnnoucements] = useState([]);
  const [projectCount, setProjectCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  const [establishme, setEstablishmentCount] = useState(0);

  const fetchData = async () => {
    try {
      const res = await API.get(`/landing`);
      setEstablishmentCount(res.data.data.establishment_count);
      setProjectCount(res.data.data.project_count);
      setStudentCount(res.data.data.student_count);
      setExperts(res.data.data.experts);
      setLogos(res.data.data.establishments);
      setAnnoucements(res.data.data.announcements);
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
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <LoadingAnimation style={{ height: 300 }} />
        </div>
      )}
      {error && <ErrorToast message={error} />}
      {!loading && !error && (
        <>
          <section className="container mx-auto">
            <HeroSection experts={experts} logos={logos} esta={establishme} />
            <Story
              student={studentCount}
              esta={establishme}
              project={projectCount}
            />
            <GuidLine />
            <Annoucement annoucements={annoucements} />
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default HomePage;
