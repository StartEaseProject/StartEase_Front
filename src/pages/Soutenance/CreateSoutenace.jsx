import TimeInput from "../../components/Globals/TimeInput";
import { useState, useEffect } from "react";
import {
  DateInput,
  Input,
  DropDownMenu,
  Button,
  LoadingAnimation,
} from "../../components/Globals";
import AddInput from "../Project management/AddInput";
import PersonRow from "../Project management/PersonRow";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";
import useRedirect from "../../useRedirect";
import { routes } from "../../routes";

const CreateSoutenance = () => {
  const redirect = useRedirect(routes.SOUTENANCE_MANAGEMENT.path)
  const { id } = useParams();
  const [rooms, setRooms] = useState([]);
  const [fetchLoading, setFetchloading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const currentDate = new Date();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [room, setRoom] = useState("");
  const [place, setPlace] = useState("");
  const [mode, setMode] = useState("");
  const [nature, setNature] = useState("");
  const [president, setPresident] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [supPic, setSupPic] = useState("");
  const [coPic, setCoPic] = useState("");
  const [co_supervisor, setCosupervisors] = useState("");
  const [testers, setTesters] = useState([]);
  const [invited, setInvited] = useState("");

  const handleDate = (e) => {
    const date = new Date(e);
    setDate(date.toISOString().split("T")[0]);
  };
  const handleMode = (e) => {
    setMode(e);
  };
  const handleNature = (e) => {
    setNature(e);
  };
  const handleTime = (e) => {
    const date = e.$d;
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const newdate = new Date(`01/01/2000 ${formattedTime}`);
    const newformattedTime = newdate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    setTime(newformattedTime);
  };
  const handleRooms = (e) => {
    const room = rooms.find((room) => room.name === e);

    setRoom(room.id);
  };

  const handlePresident = (e) => {
    setPresident(e);
  };
  const handleInvited = (e) => {
    setInvited(e);
  };

  const handleAddTesters = (e) => {
    setTesters((prev) => [...prev, e]);
  };
  const handleDeleteTesters = (index) => {
    setTesters((prev) => {
      const newTeam = [...prev];
      newTeam.splice(index, 1);
      return newTeam;
    });
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
      setSuccess("");
      setError("");
      const data = {
        date: date,
        time: time,
        room_id: room,
        other_place: place,
        mode: mode,
        nature: nature,
        president: president,
        examiners: testers,
        guest: invited,
      };
      const res = await API.post(`/defences/${id}`, data);
      setLoading(false);
      setSuccess(res.data.message);
      redirect()
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const fetchData = async () => {
    try {
      const res = await API.get(`projects/${id}`);
      setSupPic(res.data.data.project.supervisor.photo_url);
      setSupervisor(res.data.data.project.supervisor.email);
      setCoPic(res.data.data.project.co_supervisor.photo_url);
      setCosupervisors(res.data.data.project.co_supervisor.email);
      const response = await API.get(`rooms`);
      setRooms(response.data.data.rooms);
      setFetchloading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setFetchloading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {fetchLoading && <LoadingAnimation className="scale-[0.5]" />}
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {success && <SuccessToast message={success} />}
      {!fetchLoading && (
        <section className="px-layout pb-8">
          <div className="text-secondaryColor text-fs-400 font-medium">
            Create soutenance
          </div>
          <p className="text-fs-300 text-thirdColor max-w-[26rem] pt-2">
            These are the observations of this project. When updating the
            progress, the supervisor can add an observation.
          </p>
          <div className="flex mx-auto justify-between pt-8">
            <div className="flex flex-col gap-8 max-w-[22.5rem]">
              <DateInput
                handleChange={handleDate}
                icon={"calendar"}
                label={"Date"}
                min={
                  new Date(
                    currentDate.getFullYear(),
                    currentDate.getMonth(),
                    currentDate.getDate()
                  )
                }
                max={
                  new Date(
                    currentDate.getFullYear() + 1,
                    currentDate.getMonth(),
                    currentDate.getDate()
                  )
                }
              />
              <TimeInput
                handleChange={handleTime}
                label={"Time"}
                icon={"clock"}
              />
              <DropDownMenu
                isdelete={true}
                handleChange={handleRooms}
                title={"Select the room"}
                label={"Room"}
                icon={"house-2"}
                iconColor={"stroke-thirdColor"}
                isEdit={true}
                list={rooms.map((room) => room.name)}
              />

              <Input
                onChange={(e) => {
                  setPlace(e.target.value);
                }}
                label={"Other"}
                icon={"location"}
                inputProps={{ placeholder: "Enter an other place" }}
              />
              <DropDownMenu
                handleChange={handleMode}
                title={"Select the mode"}
                label={"Mode"}
                icon={"setting-2"}
                iconColor={"stroke-thirdColor"}
                isEdit={true}
                list={["on site", "remote"]}
              />
              <DropDownMenu
                handleChange={handleNature}
                title={"Select the nature of the soutenance"}
                label={"Nature"}
                icon={"setting-2"}
                iconColor={"stroke-thirdColor"}
                isEdit={true}
                list={["open", "closed"]}
              />

              <Button onClick={handleSubmit} className={"mt-4"}>
                Submit
              </Button>
            </div>
            <div className="text-thirdColor text-fs-400 pr-[10rem]">
              <div className="py-2">
                <p className="pb-2">President</p>

                {president && (
                  <PersonRow
                    email={president}
                    handleDelete={handlePresident}
                    index={""}
                  />
                )}
                {!president && <AddInput handleChange={handlePresident} />}
              </div>
              <div className="py-2">
                <p className="pb-2">Supervisor</p>

                {supervisor && (
                  <PersonRow
                    pic={supPic}
                    isDelete={true}
                    email={supervisor}
                    index={""}
                  />
                )}
              </div>
              <div className="py-2">
                <p className="pb-2">Co-Supervisors</p>

                {co_supervisor && (
                  <PersonRow
                    pic={coPic}
                    isDelete={true}
                    email={co_supervisor}
                    index={""}
                  />
                )}
              </div>
              <div className="py-2">
                <p className="pb-2">Testers</p>

                {testers.map((member, index) => {
                  return (
                    <PersonRow
                      key={index}
                      email={member}
                      handleDelete={handleDeleteTesters}
                      index={index}
                    />
                  );
                })}
                {testers.length < 3 && (
                  <AddInput handleChange={handleAddTesters} />
                )}
              </div>
              <div className="py-2">
                <p className="pb-2">Guest</p>

                {invited && (
                  <PersonRow
                    email={invited}
                    handleDelete={handleInvited}
                    index={""}
                  />
                )}
                {!invited && <AddInput handleChange={handleInvited} />}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CreateSoutenance;
