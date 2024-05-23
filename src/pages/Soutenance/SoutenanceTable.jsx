import { Icon, LoadingAnimation } from "../../components/Globals";
import { useState, useEffect } from "react";
import API from "../../utils/api-client";
import { ErrorToast } from "../../components/Globals/toasts";
import { SoutenanceRow } from "./SoutenanceRow";

const SoutenanceTable = () => {
  const pageSize = 5;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [soutenance, setSoutenances] = useState([]);
  const [shown, setShown] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [toggleFilter, setToggleFilter] = useState(false);

  const toggle = () => setToggleFilter((tg) => !tg);

  const increment = () =>
    currentPage != Math.ceil(shown.length / pageSize) - 1 &&
    setCurrentPage((p) => p + 1);
  const decrement = () => currentPage != 0 && setCurrentPage((p) => p - 1);

  const fetchSoutenace = async () => {
    setLoading(true);
    try {
      const res = await API.get("/defences");
      setSoutenances([...res.data.data.defences]);
      setShown([...res.data.data.defences]);
      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const filterAccepted = () => {
    setShown((sh) => Projects.filter((u) => u.status === "validated"));
    toggle();
  };
  const filterAll = () => {
    setShown((sh) => Projects);
    toggle();
  };

  useEffect(() => {
    fetchSoutenace();
  }, []);
  return (
    <>
      {loading && <LoadingAnimation className="scale-[0.5]" />}
      {error && <ErrorToast message={error} />}
      {!loading && (
        <section>
          <div className="pl-layout grid grid-cols-5 gap-3 text-secondaryColor pt-3">
            <div>Trademark name</div>
            <div>Date </div>
            <div>Mode</div>
            <div>Nature</div>
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
                    setToggleFilter(false);
                  }}
                  className="cursor-pointer mb-3"
                >
                  Show all
                </p>
                <p
                  onClick={() => {
                    setToggleFilter(false);
                  }}
                  className="cursor-pointer "
                >
                  Show refused after recourse
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-2">
            {shown.map((e, index) => {
              return (
                <SoutenanceRow
                  key={index}
                  date={e.date}
                  mode={e.mode}
                  nature={e.nature}
                  trademark={e.project.trademark_name}
                  link={e.id}
                />
              );
            })}
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
      )}
    </>
  );
};

export default SoutenanceTable;
