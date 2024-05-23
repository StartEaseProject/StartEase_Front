import { useState, useEffect } from "react";
import RegisterStudentPage from "./RegisterStudent";
import RegisterCommittePage from "./RegisterCommitte";
import RegisterInternshipPage from "./RegisterInternship";
import RegisterTeacherPage from "./RegisterTeacher";
import { LoadingAnimation } from "../../components/Globals";
import { useParams } from "react-router-dom";
import API from "../../utils/api-client";
import { ErrorToast } from "../../components/Globals/toasts";

const SelectCompleteRegister = () => {
  const [index, setIndex] = useState("");
  const [user, setUser] = useState(null);
  const [establishment, setEstablishment] = useState([]);
  const [filieres, setFilieres] = useState([]);
  const [grades, setGrades] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const { id } = useParams();
  const [error, setError] = useState("");
  const handleUser = (value) => setUser(value);

  const verification = async () => {
    try {
      const res = await API.get(`register/verify/${id}`);
      console.log(res.data.data);
      setIndex(res.data.data.user.person_type);
      setUser(res.data.data.user);
      setEstablishment(res.data.data.establishments);
      setFilieres(res.data.data.filieres);
      setGrades(res.data.data.grades);
      setSpecialities(res.data.data.specialities);
    } catch (e) {
      setError(e.response.data.message);
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
      {index === "student" && (
        <RegisterStudentPage
          user={user}
          establishment={establishment}
          filieres={filieres}
          spec={specialities}
          handleUser={handleUser}
        />
      )}
      {index === "scientific committee member" && (
        <RegisterCommittePage
          user={user}
          grades={grades}
          spec={specialities}
          handleUser={handleUser}
        />
      )}
      {index === "internship service member" && (
        <RegisterInternshipPage
          user={user}
          grades={grades}
          type={"internship_service_member"}
          handleUser={handleUser}
        />
      )}
      {index === "headmaster" && (
        <RegisterInternshipPage
          type={"headmaster"}
          user={user}
          grades={grades}
          handleUser={handleUser}
        />
      )}
      {index === "teacher" && (
        <RegisterTeacherPage
          user={user}
          establishment={establishment}
          grades={grades}
          spec={specialities}
          handleUser={handleUser}
        />
      )}
    </>
  );
};

export default SelectCompleteRegister;
