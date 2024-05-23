import { Icon } from "../../components/Globals";
import { useState, useEffect } from "react";
import { ProjectRow } from "./ProjectRow";
import API from "../../utils/api-client";
import { LoadingToast, ErrorToast } from "../../components/Globals/toasts";
const ProjectTable = () => {
  const pageSize = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [Projects, setProjects] = useState([]);
  const [shown, setShown] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [toggleFilter, setToggleFilter] = useState(false);

  const toggle = () => setToggleFilter((tg) => !tg);

  const increment = () =>
    currentPage != Math.ceil(shown.length / pageSize) - 1 &&
    setCurrentPage((p) => p + 1);
  const decrement = () => currentPage != 0 && setCurrentPage((p) => p - 1);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await API.get("/projects/my");
      setProjects([...res.data.data.projects]);
      setShown([...res.data.data.projects]);
      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const filterAccepted = () => {
    setShown((sh) => Projects.filter((u) => u.status === "accepted"));
    toggle();
  };
  const filterRejected = () => {
    setShown((sh) => Projects.filter((u) => u.status === "refused"));
    toggle();
  };
  const filterPending = () => {
    setShown((sh) => Projects.filter((u) => u.status === "pending"));
    toggle();
  };
  const filterRecourse = () => {
    setShown((sh) => Projects.filter((u) => u.status === "recourse"));
    toggle();
  };


  const filterAll = () => {
    setShown((sh) => Projects);
    toggle();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <>
      <section>
        {loading && <LoadingToast />}
        {error && <ErrorToast message={error} />}
        <div className="pl-layout grid grid-cols-5 gap-3 text-secondaryColor pt-3">
          <div>Trademark name</div>
          <div>Scientific name </div>
          <div>Project type</div>
          <div>Status</div>
          <div className="flex items-center gap-2 relative pl-4  z-10">
            Filter
            <Icon
              icon="down"
              className={`stroke-secondaryColor cursor-pointer transition-all duration-300 ${
                toggleFilter && "rotate-180"
              }`}
              onClick={toggle}
            />
            <div
              className={`absolute bottom-0 translate-x-[-60px] translate-y-[105%] left-0 bg-white rounded-md shadow-md
          py-3 px-5 text-secondaryColor ${!toggleFilter && "hidden"}`}
            >
              <p
                onClick={() => {
                  filterAll();
                  setToggleFilter(false);
                }}
                className="cursor-pointer mb-3"
              >
                Show all
              </p>
              <p
                onClick={() => {
                  filterAccepted();
                  setToggleFilter(false);
                }}
                className="cursor-pointer mb-3"
              >
                Show accepted
              </p>
              <p
                onClick={() => {
                  filterRejected();
                  setToggleFilter(false);
                }}
                className="cursor-pointer mb-3"
              >
                Show rejected
              </p>
              <p
                onClick={() => {
                  filterRecourse();
                  setToggleFilter(false);
                }}
                className="cursor-pointer mb-3"
              >
                Show recourse
              </p>
              <p
                onClick={() => {
                  filterPending();
                  setToggleFilter(false);
                }}
                className="cursor-pointer mb-3"
              >
                Show pending
              </p>
           
        
               
            </div>
          </div>
        </div>
        <ul className="mt-2">
          {shown
            .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
            .map((project, index) => (
              <ProjectRow
                link={`${project.id}`}
                scientificName={project.scientific_name}
                status={project.status}
                trademark={project.trademark_name}
                type={project.type}
                key={index}
              />
            ))}
        </ul>
        <div className="flex justify-end pr-12 pt-8 gap-2 text-secondaryColor">
          <input
            onChange={(event) => {
              if (
                event.target.value <= Math.ceil(shown.length / pageSize) &&
                event.target.value > 0
              )
                setCurrentPage(event.target.value - 1);
            }}
            type="number"
            dir="rtl"
            value={currentPage + 1}
            className="self-end"
          />
          <span>of</span>
          <span>{Math.ceil(shown.length / pageSize)}</span>
          <div className=" flex gap-1">
            <Icon
              icon={"left"}
              className={"stroke-secondaryColor hover:cursor-pointer"}
              onClick={decrement}
            />
            <Icon
              icon={"left"}
              className={
                "stroke-secondaryColor rotate-180 hover:cursor-pointer"
              }
              onClick={increment}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectTable;
