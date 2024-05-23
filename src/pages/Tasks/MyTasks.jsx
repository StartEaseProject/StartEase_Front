import { useState, useEffect } from "react";
import { Icon } from "../../components/Globals";
import Task from "./Task";
import { useParams } from "react-router-dom";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";
import API from "../../utils/api-client";

const MyTasks = () => {
  const [toggleFilter, setToggleFilter] = useState(false);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([]);
  const [shown, setShown] = useState([]);
  const fetchData = async () => {
    try {
      const res = await API.get(`/tasks/project/${id}`);
      setTasks(res.data.data.tasks);
      setShown(res.data.data.tasks);
      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const filterAccepted = () => {
    setShown((sh) => tasks.filter((u) => u.status === "completed"));
    setToggleFilter(false);
  };
  const filterAll = () => {
    setShown(tasks);
    setToggleFilter(false);
  };
  const filterPending = () => {
    setShown((sh) => tasks.filter((u) => u.status === "pending"));
    setToggleFilter(false);
  };
  const filterInProgress = () => {
    setShown((sh) => tasks.filter((u) => u.status === "in progress"));
    setToggleFilter(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">Tasks</div>
        <p className="text-fs-300 text-thirdColor max-w-[26rem] pt-2">
          These are the tasks of this project. Each task is provided by the
          supervisor. Project members will complete the task then submit their
          work for the supervisor to approve/refuse.
        </p>
        <div className="flex items-center gap-2 py-4 relative">
          Filter
          <Icon
            icon="down"
            className={`stroke-secondaryColor cursor-pointer transition-all duration-300  ${
              toggleFilter && "rotate-180"
            }`}
            onClick={() => {
              setToggleFilter(!toggleFilter);
            }}
          />
          {toggleFilter && (
            <div
              className={`absolute bottom-0 translate-x-[-10px] translate-y-[95%] left-0 bg-white rounded-md shadow-md
          py-3 px-5 text-secondaryColor `}
            >
              <p
                onClick={() => {
                  filterAll();
                }}
                className="cursor-pointer mb-2"
              >
                Show all
              </p>
              <p
                onClick={() => {
                  filterAccepted();
                }}
                className="cursor-pointer mb-2"
              >
                Show accepted
              </p>
              <p
                onClick={() => {
                  filterInProgress();
                }}
                className="cursor-pointer mb-2"
              >
                Show in progress
              </p>
              <p
                onClick={() => {
                  filterPending();
                }}
                className="cursor-pointer mb-2"
              >
                Show pending
              </p>
            </div>
          )}
        </div>
        <ul className="flex flex-col gap-6">
          {shown.map((task, index) => {
            return (
              <Task
                key={index}
                id={task.id}
                title={task.title}
                deadline={task.deadline}
                description={task.description}
                status={task.status}
                attachments={Object.keys(task.resources)}
              />
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default MyTasks;
