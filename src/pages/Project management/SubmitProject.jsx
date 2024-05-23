import { Input, DropDownMenu, Button } from "../../components/Globals";
import PersonRow from "./PersonRow";
import AddInput from "./AddInput";
import { useState, useEffect } from "react";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";

const SubmitProject = () => {
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [wordCount, setWordsCount] = useState(0);
  const MAX_WORDS = 100;
  const [supervisor, setSupervisor] = useState("");
  const [co_supervisor, setCoSupervisor] = useState("");
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");
  const [trademark, setTrademark] = useState("");
  const [scientificName, setScientificname] = useState("");
  const [success, setSuccess] = useState("");
  const { auth } = useAuth();
  const Domicil = auth.person?.establishment.name;
  const handleSupervisor = (e) => {
    setSupervisor(e);
  };
  const handleCoSupervisor = (e) => {
    setCoSupervisor(e);
  };
  const handleTeam = (e) => {
    setTeam((prevTeam) => [...prevTeam, e]);
  };
  const handleTeamDelete = (index) => {
    setTeam((prevTeam) => {
      const newTeam = [...prevTeam];
      newTeam.splice(index, 1);
      return newTeam;
    });
  };
  function handleChange(event) {
    if (event.target.value.trim().split(/\s+/).length <= MAX_WORDS) {
      setSummary(event.target.value);
      let count =
        event.target.value === ""
          ? 0
          : event.target.value.trim().split(/\s+/).length;
      setWordsCount(count);
    }
  }

  const handleTypes = (value) => {
    setType(value);
  };

  const initFetch = async () => {
    try {
      setError("");
      const res = await API.get(`/projects/params`);
      setLoading(false);
      setTypes(Object.values(res.data.data.types));
    } catch (er) {
      setLoading(false);
      setError(er.response.data.message);
    }
  };
  const handleSubmit = async () => {
    try {
      setError("");
      setLoading(true);
      const project = {
        type: type,
        trademark_name: trademark,
        scientific_name: scientificName,
        resume: summary,
        supervisor: supervisor,
        co_supervisor: co_supervisor,
        members: team,
      };
      console.log(project);
      const res = await API.post(`/projects`, project);
      setSuccess(res.data.message);
      setLoading(false);
    } catch (er) {
      setLoading(false);
      setError(er.response.data.message);
    }
  };

  useEffect(() => {
    if (auth.person_type === "student") {
      setTeam([...team, auth.email]);
    }
    if (auth.person_type === "teacher") {
      setSupervisor(auth.email);
    }
    initFetch();
  }, []);

  return (
    <>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      {(!loading || types.length !== 0) && (
        <section className="px-layout flex gap-28 pt-4 pb-8">
          <div className="max-w-[22.5rem] flex flex-col gap-6">
            <Input
              label={"Domicile establishment"}
              inputProps={{
                value: Domicil,
                disabled: true,
              }}
              icon="house"
            />
            <DropDownMenu
              title={"Select a project type"}
              icon={"teacher"}
              iconColor={"stroke-thirdColor"}
              isEdit={true}
              label={"Project type"}
              list={types}
              handleChange={handleTypes}
            />

            <Input
              onChange={(e) => {
                setTrademark(e.target.value);
              }}
              label={"Trademark name"}
              inputProps={{
                placeholder: "Enter your trademark name",
              }}
              icon="strongbox"
            />
            <Input
              onChange={(e) => {
                setScientificname(e.target.value);
              }}
              label={"Scientific name of the innovative product"}
              inputProps={{
                placeholder: "Enter your scientific name",
              }}
              icon="cpu"
            />
            <div className="text-fs-400 text-thirdColor">
              Summary of the project
              <p className="text-fs-300 pt-2 pb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <div
                className={`bg-secondBgColor 
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
              >
                <div className="relative w-full">
                  <textarea
                    placeholder="Summary..."
                    value={summary}
                    onChange={handleChange}
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
            </div>
          </div>
          <div className="min-w-[22.5rem] flex flex-col gap-8 text-thirdColor">
            <div>
              Management Team
              <div className="text-fs-200 py-2">
                Supervisor
                {supervisor && (
                  <PersonRow
                    email={supervisor}
                    handleDelete={handleSupervisor}
                    isDelete={auth.email === supervisor}
                    index={""}
                  />
                )}
                {!supervisor && <AddInput handleChange={handleSupervisor} />}
              </div>
              <div className="text-fs-200 py-2">
                Supervisor assistant
                {co_supervisor && (
                  <PersonRow
                    email={co_supervisor}
                    handleDelete={handleCoSupervisor}
                    isDelete={false}
                    index={""}
                  />
                )}
                {!co_supervisor && (
                  <AddInput handleChange={handleCoSupervisor} />
                )}
              </div>
            </div>
            <div className="min-w-[22.5rem]  text-thirdColor">
              Project Team
              <div>
                {team.map((member, index) => {
                  return (
                    <PersonRow
                      key={index}
                      email={member}
                      handleDelete={handleTeamDelete}
                      index={index}
                      isDelete={auth.email === member}
                    />
                  );
                })}

                {team.length < 6 && <AddInput handleChange={handleTeam} />}
              </div>
            </div>
            <Button onClick={handleSubmit}>Submit</Button>
          </div>
        </section>
      )}
    </>
  );
};

export default SubmitProject;
