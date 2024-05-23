import {
  Button,
  DropDownMenu,
  DateInput,
} from "../../components/Globals";
import { useState, useEffect } from "react";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";

const PeriodManagement = () => {
  const currentDate = new Date();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [success, setSuccess] = useState("");
  const [periodDetails, setPeriodDetails] = useState([]);
  const [index, setIndex] = useState(null);

  const handlePeriod = (value) => {
    const index = periodDetails.findIndex((obj) => obj.name === value);
    setIndex(index);
    if (periodDetails.length > 0) {
      setStart((periodDetails[index].start_date));
      setEnd((periodDetails[index].end_date));
    }
  };
  const handleChangeEnd = (date) => {
    setEnd(date.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };
  const handleChangeStart = (date) => {
    setStart(date.toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-"));
  };

  const handleSubmit = async () => {
    try {
      setSuccess("");
      setError("");
      setLoading(true);

      const p = {
        period: index + 1,
        start_date: start,
        end_date: end,
      };
      const res = await API.put(`/periods`, p);
      const newData = periodDetails.map((item) => {
        if (item.id === index + 1) {
          return {
            ...item,
            start_date: start,
            end_date: end,
          };
        }
        return item;
      });
      setPeriodDetails(newData);
      setLoading(false);
      setSuccess(res.data.message);
    } catch (er) {
      setLoading(false);
      setError(er.response.data.message);
    }
  };

  const initFetch = async () => {
    try {
      setError("");
      const res = await API.get(`/periods`);
      setPeriodDetails(res.data.data.periods);
      setLoading(false);
    } catch (er) {
      setLoading(false);
      setError(er.response.data.message);
    }
  };
  useEffect(() => {
    initFetch();
  }, []);
  return (
    <>
      {success && <SuccessToast message={success} />}
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      {(!loading || periodDetails.length !== 0) && (
        <section className="pl-8 pt-4">
          <div className="text-fs-500 font-medium text-secondaryColor">
            Periods Management
          </div>
          <p className="text-thirdColor text-fs-300 max-w-[500px] py-4 ">
            This form is for changing the dates of the project submission
            period, validation period, recourse period and recourse validation
            period. Please select a period and enter the start-end dates.
          </p>
          {periodDetails.map((period, index) => {
            return (
              <div
                key={index}
                className="text-secondaryColor text-fs-400 py-3 font-medium"
              >
                {period.name}
                <p className="text-thirdColor text-fs-300 py-2 font-normal">
                  Start: {period.start_date}
                </p>
                <p className="text-thirdColor text-fs-300 font-normal">
                  End: {period.end_date}
                </p>
              </div>
            );
          })}
          <div className="flex flex-col gap-6 py-8 max-w-[22.5rem]">
            <DropDownMenu
              isEdit={true}
              icon={"period"}
              list={periodDetails.map((period) => period.name)}
              title={"Select a period"}
              label={"Period"}
              iconColor={"stroke-thirdColor"}
              handleChange={handlePeriod}
            />

            <DateInput
              min={
                new Date(
                  currentDate.getFullYear() - 1,
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
              value={start}
              label={"Start Time"}
              icon={"calendar"}
              handleChange={handleChangeStart}
            />
            <DateInput
              min={
                new Date(
                  currentDate.getFullYear() - 1,
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
              value={end}
              label={"End Time"}
              icon={"calendar"}
              handleChange={handleChangeEnd}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className={"mt-8"}
            >
              Confirm
            </Button>
          </div>
        </section>
      )}
    </>
  );
};

export default PeriodManagement;
