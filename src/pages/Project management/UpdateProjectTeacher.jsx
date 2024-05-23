import {
  Input,
  DropDownMenu,
  Button,
  Icon,
  Modal,
} from "../../components/Globals";
import PersonRow from "./PersonRow";
import AddInput from "./AddInput";
import { useState, useEffect } from "react";
import Attachment from "./Attachement";
import { useParams } from "react-router-dom";
import API from "../../utils/api-client";
import {
  LoadingToast,
  ErrorToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";

const UpdateProjectTeacher = () => {
  const { auth } = useAuth();
  const [supervisor, setSupervisor] = useState("");
  const [co_supervisor, setCoSupervisor] = useState("");
  const [team, setTeam] = useState([]);
  const [summary, setSummary] = useState("");
  const [wordCount, setWordsCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [uiTypes, setUiTypes] = useState([]);
  const [attTypes, setAttTypes] = useState([]);
  const [attType, setAttType] = useState("");
  const MAX_WORDS = 100;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [project, setProject] = useState(null);
  const [scientificName, setScientificName] = useState("");
  const [trademark, setTrademark] = useState("");
  const [success, setSuccess] = useState("");
  const fetchData = async () => {
    try {
      const response = await API.get(`projects/params`);
      let tempTypes = Object.values(
        response.data.data.project_files_types.COMMITTEE
      );

      setUiTypes(Object.values(response.data.data.types));
      if (id) {
        const res = await API.get(`projects/${id}`);
        console.log(res.data.data);
        setProject(res.data.data.project);
        setType(res.data.data.project.type);
        setSummary(res.data.data.project.resume);
        setScientificName(res.data.data.project.scientific_name);
        setTrademark(res.data.data.project.trademark_name);
        setTeam(res.data.data.project.members.map((user) => user.email));
        setSupervisor(res.data.data.project.supervisor.email);
        setCoSupervisor(res.data.data.project.co_supervisor.email);
        const newArray = tempTypes.filter(
          (item) => !Object.keys(res.data.data.project.files).includes(item)
        );
        setAttTypes(newArray);
        const newAtt = Object.entries(res.data.data.project.files).map(
          ([key, value]) => ({
            file: {
              name: value.name,
              path: value.link,
            },
            type: key,
          })
        );
        setAttachments(newAtt);
        setLoading(false);
        let count =
          res.data.data.project.resume === ""
            ? 0
            : res.data.data.project.resume.trim().split(/\s+/).length;
        setWordsCount(count);
      } else {
        const res = await API.get(`projects/my`);
        setProject(res.data.data.project);
        setScientificName(res.data.data.project.scientific_name);
        setTrademark(res.data.data.project.trademark_name);
        setSupervisor(res.data.data.project.supervisor.email);
        setType(res.data.data.project.type);
        setSummary(res.data.data.project.resume);
        console.log(res.data.data);
        const newArray = tempTypes.filter(
          (item) => !Object.keys(res.data.data.project.files).includes(item)
        );
        setAttTypes(newArray);

        const newAtt = Object.entries(res.data.data.project.files).map(
          ([key, value]) => ({
            file: {
              name: value.name,
              path: value.link,
            },
            type: key,
          })
        );
        setAttachments(newAtt);
        setCoSupervisor(res.data.data.project.co_supervisor.email);
        setTeam(res.data.data.project.members.map((user) => user.email));
        let count =
          res.data.data.project.resume === ""
            ? 0
            : res.data.data.project.resume.trim().split(/\s+/).length;
        setWordsCount(count);
        setLoading(false);
      }
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  function handleFileUpload(event) {
    const file = event.file;
    if (file.type === "application/pdf") {
      setAttachments((prevAtt) => [...prevAtt, event]);
    } else {
      alert("Please select a PDF file");
    }
  }
  function handleFileDelete(index) {
    setAttachments((prevAtt) => {
      const newAtt = [...prevAtt];
      newAtt.splice(index, 1);
      return newAtt;
    });
  }
  const handleType = (e) => {
    setType(e);
  };
  const handleAttType = (e) => {
    setAttType(e);
  };
  const handleSupervisor = (e) => {
    setSupervisor(e);
  };
  const handleCoSupervisor = (e) => {
    setCoSupervisor(e);
  };
  const handleOneFile = (e) => {
    setFile(e);
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
    if (event.target.value.trim().split(/\s+/).length <= 100) {
      setSummary(event.target.value);
      let count =
        event.target.value === ""
          ? 0
          : event.target.value.trim().split(/\s+/).length;
      setWordsCount(count);
    }
  }

  const handleSubmit = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);
      const new_project = {
        type: type,
        trademark_name: trademark,
        scientific_name: scientificName,
        resume: summary,
        supervisor: supervisor,
        co_supervisor: co_supervisor,
      };
      const formData = new FormData();
      formData.append("_method", "PUT");
      for (const key in new_project) {
        formData.append(key, new_project[key]);
      }
      for (let i = 0; i < team.length; i++) {
        formData.append("member[]", team[i]);
      }

      for (let i = 0; i < attachments.length; i++) {
        if (attachments[i].file.path) {
          formData.append("old_files[]", attachments[i].file.path);
        }
        if (!attachments[i].file.path) {
          formData.append("files[]", attachments[i].file);
          formData.append("files_types[]", attachments[i].type);
        }
      }

      const res = await API.post(`/projects/${project.id}`, formData);
      console.log(res.data);
      setSuccess(res.data.message);
      setLoading(false);
    } catch (er) {
      setLoading(false);
      setError(er.response.data.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      {project && (
        <>
          {open && (
            <Modal
              title={"Add an attachment"}
              closeModal={() => {
                setOpen(false);
              }}
            >
              <DropDownMenu
                isEdit={true}
                label={"Attachment type"}
                title={"select a type"}
                list={attTypes}
                handleChange={handleAttType}
              />
              <label htmlFor="pdf-file">
                <div className="py-4 text-primaryColor hover:cursor-pointer">
                  Add attachment
                </div>
              </label>
              <input
                type="file"
                id="pdf-file"
                accept="application/pdf"
                onChange={(e) => {
                  handleOneFile(e.target.files[0]);
                }}
                className="hidden "
              />
              {file && (
                <Attachment
                  name={file.name}
                  index={null}
                  isEdit={true}
                  isDownload={false}
                  isUpload={false}
                  handleDelete={handleOneFile}
                />
              )}
              <ul className="flex justify-between px-8 py-4">
                <li
                  onClick={() => {
                    if (file && attType !== "") {
                      const data = {
                        type: attType,
                        file: file,
                      };
                      handleFileUpload(data);
                      setOpen(false);
                      const index = attTypes.indexOf(attType);
                      setAttTypes((prevT) => {
                        const newT = [...prevT];
                        newT.splice(index, 1);
                        return newT;
                      });
                      setFile(null);
                    }
                  }}
                  className="text-mainGreen hover:cursor-pointer"
                >
                  Confirm
                </li>
                <li
                  onClick={() => {
                    setFile(null);
                    setOpen(false);
                  }}
                  className="text-mainRed hover:cursor-pointer"
                >
                  Cancel
                </li>
              </ul>
            </Modal>
          )}
          <section className="px-layout flex gap-28 pt-4 pb-8">
            <div className="max-w-[22.5rem] flex flex-col gap-6">
              <Input
                label={"Domicile establishment"}
                inputProps={{
                  value: project.establishment.name,
                  disabled: true,
                }}
                icon="house"
              />
              <DropDownMenu
                title={type}
                icon={"teacher"}
                iconColor={"stroke-thirdColor"}
                isEdit={true}
                label={"Project type"}
                list={uiTypes}
                handleChange={handleType}
              />

              <Input
                label={"Trademark name"}
                inputProps={{
                  placeholder: "Enter your trademark name",
                  defaultValue: trademark,
                }}
                icon="strongbox"
              />
              <Input
                label={"Scientific name of the innovative product"}
                inputProps={{
                  placeholder: "Enter your scientific name",
                  defaultValue: scientificName,
                }}
                icon="cpu"
              />
              <div className="text-fs-400 text-thirdColor">
                Summary of the project
                <p className="text-fs-300 pt-2 pb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <div
                  className={`bg-secondBgColor 
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
                >
                  <div className="relative w-full">
                    <textarea
                      value={summary}
                      onChange={(e) => handleChange(e)}
                      placeholder="Summary..."
                      rows={5}
                      className={`focus:outline-0  disabled:text-thirdColor placeholder:text-thirdColor grow bg-transparent 
            w-full group-focus-within:text-secondaryColor
                text-secondaryColor caret-secondaryColor
                `}
                    />

                    <span
                      className={` absolute bottom-0 right-10 ${
                        wordCount > MAX_WORDS
                          ? "text-mainRed"
                          : "text-thirdColor"
                      }`}
                    >
                      {wordCount} - {MAX_WORDS} words
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-fs-400 text-thirdColor pb-10">
                <div className="flex justify-between">
                  <p>Attachments</p>
                  <div
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <Icon
                      icon={"add"}
                      className={"stroke-primaryColor hover:cursor-pointer"}
                    />
                  </div>
                </div>

                <p className="text-fs-300 pt-2 pb-4">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
                <ul className="flex flex-col gap-5">
                  {attachments.map((attachment, index) => {
                    return (
                      <li key={attachment.type} className="py-2">
                        <Attachment
                          title={attachment.type}
                          filePath={
                            attachment?.file.path
                              ? attachment.file.path
                              : URL.createObjectURL(attachment.file)
                          }
                          name={attachment.file.name}
                          isEdit={true}
                          isDownload={false}
                          isUpload={false}
                          handleDelete={() => {
                            handleFileDelete(index);
                            setAttTypes((prevT) => [...prevT, attachment.type]);
                          }}
                          index={index}
                        />
                      </li>
                    );
                  })}
                </ul>
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
                      index={""}
                      isDelete={auth.email === supervisor}
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
                      index={""}
                      isDelete={auth.email === co_supervisor}
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
              <Button onClick={handleSubmit}> Confirm</Button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default UpdateProjectTeacher;
