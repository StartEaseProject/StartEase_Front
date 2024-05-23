import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ErrorToast } from "../../components/Globals/toasts";
import { LoadingAnimation } from "../../components/Globals";
import API from "../../utils/api-client";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/globals/logo.svg";

const AnnoucementPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [annoucement, setAnnoucement] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const res = await API.get(`/announcements/public/${id}`);
      console.log(res.data.data);
      setAnnoucement(res.data.data.announcement);
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
      {!loading && (
        <>
          <section className="container mx-auto">
            <nav className="flex justify-around pt-6 items-center">
              <img src={logo} alt="StartEase" className="h-8 " />
              <div className="flex gap-8 text-thirdColor">
                <p className="hover:underline hover:cursor-pointer">
                  How it works
                </p>
                <p className="hover:underline hover:cursor-pointer">Library</p>
                <p className="hover:underline hover:cursor-pointer">Contact</p>
              </div>
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="transition-all duration-700 hover:scale-105  hover:shadow-lg hover:shadow-blue-400 bg-primaryColor text-white rounded-lg px-14 py-3 "
              >
                Sign in
              </button>
            </nav>
            <div className="relative isolate mx-40 mt-16">
              <div className="relative">
                <img
                  src={annoucement.photo}
                  alt="announcement"
                  className="w-full h-[33.9rem] bg-thirdColor my-8 rounded-3xl object-cover transition-all duration-500"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-40 rounded-3xl"></div>
              </div>
              <div className="absolute -z-10 -top-2 left-1/2 transform -translate-x-1/2 rounded-full bg-transparent border-2 border-thirdColor opacity-50  h-[35rem] w-[35rem]" />
              <div className="absolute -z-10 -top-[2rem] left-1/2 transform -translate-x-1/2 rounded-full bg-transparent border-2 border-thirdColor opacity-20 h-[38rem] w-[38rem]" />
              <div className="absolute -z-10 -top-[3.5rem] left-1/2 transform -translate-x-1/2 rounded-full bg-transparent border-2 border-thirdColor opacity-5  h-[41rem] w-[41rem]" />
            </div>
            <div className="mx-40 pt-16 pb-36">
              <div className="text-secondaryColor text-fs-800  transition-all duration-500">
                {annoucement.title}
              </div>
              <p className="text-thirdColor text-fs-600 transition-all duration-500">
                {annoucement.description}
              </p>
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};

export default AnnoucementPage;
