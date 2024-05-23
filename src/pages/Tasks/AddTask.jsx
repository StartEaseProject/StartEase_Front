import { useState } from "react";
import { Button, Icon, Input } from "../../components/Globals";
import { DateInput } from "../../components/Globals";
import API from "../../utils/api-client";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useParams } from "react-router-dom";
const AddTask = () => {
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const currentDate = new Date();
  const [attachments, setAttachments] = useState([]);
  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(null);
  const [wordCount, setWordsCount] = useState(0);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
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
  const handleDate = (e) => {
    setDate(e.toISOString().split("T")[0]);
  };
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const handleSubmit = async () => {
    let err = false;
    if (!title) {
      setError("Title is required");
      err = true;
    }
    if (!description) {
      setError("Description is required");
      err = true;
    }
    if (!date) {
      setError("Deadline is required");
      err = true;
    }
    if (!err) {
      try {
        setSuccess("");
        setLoading(true);
        const task = {
          title: title,
          description: description,
          deadline: date,
          resources: attachments,
        };
        const res = await API.post(`/tasks/${id}`, task);
        setLoading(false);
        setSuccess(res.data.message);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      {success && <SuccessToast message={success} />}
      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          Add task
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
          To add a task, please provide its title, description and deadline. You
          must also provide the attachments that the project members must
          provide in order to complete the task.
        </p>
        <div className="flex gap-28">
          <div className="max-w-[22.5rem]">
            <div className="text-thirdColor text-fs-400 pb-3 pt-8">
              Informations
            </div>

            <Input
              className={"pb-4"}
              icon={"note-2"}
              inputProps={{ placeholder: "title" }}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
            <div
              className={`bg-secondBgColor w-[22.5rem]
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
            >
              <div className="relative w-full">
                <textarea
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
              handleChange={handleDate}
              className={"pt-4 pb-8"}
              min={
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate()
                )
              }
              max={
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 6,
                  currentDate.getDate()
                )
              }
              label={"Deadline"}
              icon={"calendar"}
            />

            <Button
              onClick={() => {
                handleSubmit();
              }}
            >
              Confirm
            </Button>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTask;
