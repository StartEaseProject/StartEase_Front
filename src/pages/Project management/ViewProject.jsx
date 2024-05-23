import { NavCard, DropDownMenu, Modal } from "../../components/Globals";
import { useState, useEffect } from "react";
import Attachment from "./Attachement";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
const ViewProject = () => {
  const { id } = useParams();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [allStatus, setAllStatus] = useState([]);
  const [project, setProject] = useState(null);
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState("");
  const [w, setW] = useState(0);
  const [open, setOpen] = useState(false);
  const [canValidate, setCanValidate] = useState(false)
  const [file, setFile] = useState(null);
  const handleStatus = (value) => {
    setStatus(value);
    setShow(true);
  };

  const handleAutorize = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      setOpen(false);
      const formdata = new FormData();
      formdata.append("_method", "PUT");
      formdata.append("file", file);
      const res = await API.post(`/projects/${id}/authorize`, formdata);
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await API.get(`projects/${id}`);
      const response = await API.get(`projects/params`);
      setProject(res.data.data.project);
      setStatus(res.data.data.project.status)
      if (res.data.data.project.status === "recourse") {
        setAllStatus(
          Object.values(response.data.data.statuses).filter(
            (e) => e !== "recourse"
          )
        );
      } else {
        setAllStatus(Object.values(response.data.data.statuses));
      }

      const res2 = await API.get(`/periods`)
      const validationPeriod = res2.data.data.periods.find(
        (period) => period.name === 'projects validation period'
      )
      const currentDate = new Date()
      const startDate1 = new Date(validationPeriod.start_date);
      const endDate1 = new Date(validationPeriod.end_date)
      const recourseValidationPeriod = res2.data.data.periods.find(
        (period) => period.name === 'projects recourse validation period'
      )
      const startDate2 = new Date(recourseValidationPeriod.start_date)
      const endDate2 = new Date(recourseValidationPeriod.end_date)

      if (res.data.data.project.status==='pending' && currentDate >= startDate1 && currentDate <= endDate1 ) {
        setCanValidate(true)
      } else if(res.data.data.project.status==='recourse' && currentDate >= startDate2 && currentDate <= endDate2){
        setCanValidate(true)
      } else{
        setCanValidate(false)
      }

      const keys = Object.keys(res.data.data.project.progress);
      const progress = keys[keys.length - 1];
      progress ? setW((progress / 100) * 24) : setW(0);
      
      setLoading(false);
    } catch (e) {
      throw e
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectStatus = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);
      const res = await API.put(`/projects/status`, {
        project: id,
        status: status,
      });
      setShow(false);
      setSuccess(res.data.message);
      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOneFile = (e) => {
    setFile(e);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {success && <SuccessToast message={success} />}
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {open && (
        <Modal
          title={"Autorizing project"}
          closeModal={() => {
            setOpen(false);
          }}
        >
          <div className="text-thirdColor">
            Are you sure you want to autorize this project?
          </div>
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
            className="hidden"
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
          <ul className="flex gap-16 justify-center pt-4 pb-2 font-medium text-fs-400">
            <li
              onClick={handleAutorize}
              className="text-mainGreen hover:cursor-pointer"
            >
              Yes
            </li>
            <li
              onClick={() => {
                setOpen(false);
              }}
              className="text-mainRed hover:cursor-pointer"
            >
              No
            </li>
          </ul>
        </Modal>
      )}
      {(!loading || project) && (
        <section className="px-layout pb-8">
          <div>
            <div className="flex justify-between">
              <div className="flex gap-6">
                <DropDownMenu
                  isEdit={
                    project.status !== "accepted" &&
                    project.status !== "refused" &&
                    canValidate &&
                    (success ? success && status !== "accepted" : true) &&
                    (success ? success && status !== "refused" : true) &&
                    auth?.permissions.find((e) => e.name === "validate-project")
                  }
                  label="Project status"
                  icon={"clipboard"}
                  list={allStatus}
                  iconColor={
                    status === "pending"
                      ? "stroke-mainPending"
                      : status === "refused"
                      ? "stroke-mainRed"
                      : status === "accepted"
                      ? "stroke-mainGreen"
                      : status === "recourse"
                      ? "stroke-mainRecourse"
                      : "stroke-thirdColor"
                  }
                  title={status}
                  className={`w-[27.5rem] ${
                    status === "pending"
                      ? "bg-lightPending text-mainPending"
                      : status === "refused"
                      ? "bg-lightRed text-mainRed"
                      : status === "accepted"
                      ? "bg-lightGreen text-mainGreen"
                      : status === "recourse"
                      ? "bg-lightRecourse text-mainRecourse"
                      : "bg-secondBgColor "
                  }`}
                  handleChange={handleStatus}
                />
                {show && (
                  <button
                    onClick={handleProjectStatus}
                    className="text-primaryColor pt-6"
                  >
                    Save
                  </button>
                )}
              </div>
              {project.status === "accepted" &&
                !project.is_authorized_defence &&
                auth.id === project.supervisor.id && (
                  <button
                    onClick={() => {
                      setOpen(true);
                    }}
                    className="text-mainGreen pr-16"
                  >
                    Authorize project
                  </button>
                )}
              {project.files["thesis defence authorization file"] && (
                <a
                  className="text-mainGreen pr-16"
                  href={project.files["thesis defence authorization file"].link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Authorization file
                </a>
              )}
            </div>
            <div className="text-fs-400 text-thirdColor py-6">
              Project advancement
            </div>
            <div className="flex gap-12">
              <div className="grid grid-flow-col gap-3">
                <div className="bg-bgColor w-[24rem] h-3 rounded-lg self-center">
                  <div
                    style={{ width: `${w}rem` }}
                    className="bg-primaryColor h-3 rounded-lg"
                  />
                </div>
                <div className="self-center justify-self-center text-secondaryColor inline-block">
                  {Math.floor((w * 100) / 24)} %
                </div>
              </div>
              {project.status === "accepted" &&
                auth.id === project.supervisor.id && (
                  <button
                    onClick={() => {
                      navigate("update-advancement");
                    }}
                    className="text-primaryColor"
                  >
                    Update
                  </button>
                )}
            </div>
            <div className="pt-4 grid gap-6 max-w-[27.5rem]">
              <div className="text-fs-400 text-thirdColor">Informations</div>
              <NavCard
                text={"View project details"}
                icon={"teacher"}
                link={`/main-menu/project_management/${id}/details`}
              />
              {auth.id === project.project_holder.id &&
                project.status !== "accepted" &&
                auth.permissions.find((e) => e.name === "update-project") && (
                  <NavCard
                    text={"Edit project"}
                    icon={"edit"}
                    link={
                      "/main-menu/project_management/" + id + "/update-project"
                    }
                  />
                )}
              {auth.permissions.find((e) => e.name === "read-remark") && (
                <NavCard
                  text={"Remarks"}
                  icon={"note"}
                  link={`/main-menu/project_management/${id}/remarks`}
                />
              )}
              {project.status === "accepted" &&
                auth.permissions.find((e) => e.name === "read-task") && (
                  <NavCard
                    text={"Tasks"}
                    icon={"note-2"}
                    link={`/main-menu/project_management/${id}/tasks`}
                  />
                )}
              {project.status === "accepted" &&
                auth.permissions.find((e) => e.name === "read-comment") && (
                  <NavCard
                    text={"Comments"}
                    icon={"note"}
                    link={`/main-menu/project_management/${id}/comments`}
                  />
                )}
              {project.status === "accepted" &&
                auth.permissions.find(
                  (e) => e.name === "read-project-observation"
                ) && (
                  <NavCard
                    text={"Project Observations"}
                    icon={"teacher"}
                    link={`/main-menu/project_management/${id}/observations`}
                  />
                )}
              {project.is_authorized_defence &&
                !project.defence_id &&
                auth.permissions.find((e) => e.name === "create-defence") && (
                  <NavCard
                    text={"Create soutenance"}
                    icon={"teacher"}
                    link={`/main-menu/project_management/${id}/defence`}
                  />
                )}
              {project.defence_id &&
                auth.permissions.find((e) => e.name === "read-defence") && (
                  <NavCard
                    text={"View defence"}
                    icon={"teacher"}
                    link={`/main-menu/thesis-management/${project.defence_id}`}
                  />
                )}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ViewProject;
