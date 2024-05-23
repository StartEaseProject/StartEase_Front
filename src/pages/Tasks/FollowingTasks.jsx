import { useState, useEffect } from "react";
import { Icon } from "../../components/Globals";
import AdminTask from "./AdminTask";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ErrorToast, LoadingToast } from "../../components/Globals/toasts";
import API from "../../utils/api-client";
import { useAuth } from "../../AuthContext";
import useRedirect from "../../useRedirect";

const FollowingTasks = () => {
  const redirect = useRedirect("")
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth()
  const [error, setError] = useState("");
  const [shownTask, setShownTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [toggleFilter, setToggleFilter] = useState(false);
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
    redirect()
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
  const handleDeleteTask = (index, taskIndex) => {
    setTasks([...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]);
    setShown([...shown.slice(0, index), ...shown.slice(index + 1)]);
    redirect()
  };

  const handleShownTask = async (id) => {
    try {
      setLoading(true);
      const res = await API.get(`/tasks/${id}`);
      setShownTask(res.data.data.task);
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
        <div className="text-secondaryColor text-fs-400 font-medium">Tasks</div>
        <p className="text-fs-300 text-thirdColor max-w-[26rem] pt-2">
          These are the tasks of this project. Each task is provided by the
          supervisor. Project members will complete the task then submit their
          work for the supervisor to approve/refuse.
        </p>
        <div className="max-w-[34rem] ">
          <div className="flex justify-between">
            <div className="flex items-center gap-2 py-4 relative ">
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
                  className={`absolute w-[12rem] bottom-0 translate-x-[-10px] translate-y-[95%] left-0 bg-white rounded-md shadow-md
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
                    Show completed
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
            {auth.permissions.find(e => e.name==="create-task") && <button
              onClick={() => {
                navigate("add-task");
              }}
              className="text-primaryColor"
            >
              Add Task
            </button>}
          </div>
          <ul className="flex flex-col gap-6">
            {shown.map((task, index) => {
              return (
                <AdminTask
                  key={index}
                  id={task.id}
                  canUpdate={auth.permissions.find(
                    (e) => e.name === 'update-task'
                  )}
                  canDelete={auth.permissions.find(
                    (e) => e.name === 'delete-task'
                  )}
                  title={task.title}
                  deadline={task.deadline}
                  description={task.description}
                  status={task.status}
                  attachments={Object.keys(task.resources)}
                  index={index}
                  taskIndex={tasks.findIndex((item) => item.id === task.id)}
                  handleDelteTask={handleDeleteTask}
                />
              )
            })}
          </ul>
        </div>
      </section>
    </>
  );
};

export default FollowingTasks;
