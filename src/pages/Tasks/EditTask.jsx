import { useState, useEffect } from "react";
import { Button, DateInput, Icon, Input } from "../../components/Globals";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useParams } from "react-router-dom";
import API from "../../utils/api-client";
const EditTask = () => {
  const { task_id } = useParams();
  const [attachments, setAttachments] = useState([]);
  const [description, setDescription] = useState("");
  const [wordCount, setWordsCount] = useState(0);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const MAX_WORDS = 100;
  function handleChange(event) {
    if (event.target.value.trim().split(/\s+/).length <= MAX_WORDS) {
      setDescription(event.target.value);
      let count =
        event.target.value === ""
          ? 0
          : event.target.value.trim().split(/\s+/).length;
      setWordsCount(count);
    }
  }
  const handleAttachments = (e) => {
    setAttachments((prev) => [...prev, e]);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const fetchData = async () => {
    try {
      const res = await API.get(`/tasks/${task_id}`);
      setTitle(res.data.data.task.title);
      setDescription(res.data.data.task.description);
      let count =
        res.data.data.task.description === ""
          ? 0
          : res.data.data.task.description.trim().split(/\s+/).length;
      setWordsCount(count);
      setAttachments(Object.keys(res.data.data.task.resources));
      setDate(res.data.data.task.deadline);

      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDate = (e) => {
    setDate(
      e
        .toLocaleDateString("en-CA", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
    );
  };
  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const res = await API.put(`tasks/${task_id}`, {
        title: title,
        description: description,
        deadline: date,
        resources: attachments,
      });
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {loading && <LoadingToast />}
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {(!loading || title) && (
        <section className="px-layout pb-8">
          <div className="text-secondaryColor text-fs-400 font-medium">
            Update task
          </div>
          <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
            To update a task, please provide its new title, description and
            deadline. You must also update the attachments that the project
            members must provide in order to complete the task.
          </p>
          <div className="flex gap-28">
            <div className="max-w-[22.5rem]">
              <div className="text-thirdColor text-fs-400 pb-3 pt-8">
                Informations
              </div>
              <Input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className={"pb-4"}
                icon={"note-2"}
                inputProps={{ placeholder: "title", defaultValue: title }}
              />
              <div
                className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
              >
                <div className="relative w-full">
                  <textarea
                    value={description}
                    onChange={handleChange}
                    placeholder="Description..."
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
              <DateInput
                className={"pt-4 pb-8"}
                label={"DeadLine"}
                icon={"calendar"}
                value={date}
                disabled={false}
                handleChange={handleDate}
              />

              <Button onClick={handleSubmit}>Confirm</Button>
            </div>
            <div className="min-w-[22.5rem]  text-thirdColor pt-8">
              Required attachments
              <div>
                {attachments.map((name, index) => {
                  return (
                    <ul key={index} className="flex justify-between py-4">
                      <li>{name}</li>
                      <li
                        onClick={() => {
                          setAttachments((prev) => {
                            const newAtt = [...prev];
                            newAtt.splice(index, 1);
                            return newAtt;
                          });
                        }}
                      >
                        <Icon
                          icon={"trash"}
                          className={"stroke-primaryColor hover:cursor-pointer"}
                        />
                      </li>
                    </ul>
                  );
                })}
                <div className="flex justify-between max-w-[27rem] py-2">
                  <input
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                    type="text"
                    className="w-[20rem] text-secondaryColor"
                  />

                  <button
                    onClick={async () => {
                      if (value !== "") {
                        handleAttachments(value);
                        setValue("");
                        setError("");
                      } else {
                        setError("Value can't be empty");
                        await sleep(4000);
                        setError("");
                      }
                    }}
                    className="text-primaryColor text-fs-400"
                  >
                    Add
                  </button>
                </div>
                {error && (
                  <div className="text-mainRed text-fs-300">{error}</div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default EditTask;
