import { useState, useEffect } from "react";
import { LoadingAnimation } from "../../components/Globals";
import { ErrorToast } from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";
import Student from "./StudentDashboard";
import Others from "./OtherDashboard";
import Admin from "./AdminDashboard";
import Teacher from "./TeacherDashboard";

const Home = () => {
  const { auth } = useAuth();
  const [index, setIndex] = useState("");
  const [error, setError] = useState("");

  const verification = async () => {
    try {
      if (
        auth.roles.some((e) => {
          return e.name === "super_admin";
        })
      ) {
        setIndex("admin");
      } else if (
        auth.roles.some((e) => {
          return e.name === "teacher";
        })
      ) {
        setIndex("teacher");
      } else if (
        auth.roles.some((e) => {
          return e.name === "student";
        })
      ) {
        setIndex("student");
      } else {
        setIndex("others");
      }
    } catch (e) {
      setError(e);
    }
  };
  useEffect(() => {
    verification();
  }, []);
  return (
    <>
      {error && <ErrorToast message={error} />}
      {index === "" && error === "" && (
        <div className="flex items-center justify-center h-screen">
          <LoadingAnimation style={{ height: 300 }} />
        </div>
      )}
      {index === "student" && <Student/>}
      {index === "others" && <Others/>}

      {index === "admin" && <Admin/>}
      {index === "teacher" && <Teacher/>}
    </>
  );
};

export default Home;
