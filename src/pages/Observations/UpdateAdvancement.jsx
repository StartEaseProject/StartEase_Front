import { useState } from "react";
import { Button } from "../../components/Globals";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";

const UpdateAdvancement = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [wordCount, setWordsCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState(0);
  const [success, setSuccess] = useState("");

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

  const handleSubmit = async () => {
    setError("")
    let err = false;
    if (!description) {
      setError("Observation is required");
      err = true;
    }
    if (!err) {
      try {
        setSuccess("");
        setLoading(true);
        const observation = {
          progress: parseInt(value),
          observation: description,
        };
        const res = await API.put(`projects/${id}/progress`, observation);
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
      {success && <SuccessToast message={success} />}
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}

      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          Update project progress
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[26rem] pt-2">
          As a supervisor, you can update the progress of a project and add an
          optional observation that describes the current progress of the team.
        </p>
        <div className="pt-8 pb-4 text-thirdColor">Project advancement</div>
        <div className="grid grid-flow-col gap-3 max-w-[26rem]">
          <div
            className={`transition-all duration-300 bg-bgColor w-[22.5rem] h-3 rounded-lg self-center relative`}
          >
            <input
              onChange={(e) => {
                setValue(e.target.value);
              }}
              value={value}
              type="range"
              style={{
                background: `linear-gradient(to right, #6F88FC ${value}%, transparent 0%)`,
              }}
              min="0"
              max="100"
              className="w-[22.5rem] h-3 absolute top-0  appearance-none cursor-pointer accent-primaryColor 
              focus:outline-none focus:ring-0 border-0 rounded-lg"
            />
          </div>

          <div className="self-center justify-self-center text-secondaryColor inline-block">
            <div className="flex">
              <input
                onChange={(e) => {
                  if (e.target.value >= 0 && e.target.value <= 100) {
                    setValue(e.target.value);
                  }
                }}
                type="number"
                value={value}
                className="w-7"
              />
              <p>%</p>
            </div>
          </div>
        </div>
        <div className="pt-8 pb-4 text-thirdColor">Observation</div>

        <div
          className={`bg-secondBgColor w-[22.5rem] 
                py-[13px] rounded-[10px] px-[10px] flex items-center gap-[10px] group outline-2
                focus-within:outline-primaryColor focus-within:outline 
          `}
        >
          <div className="relative w-full">
            <textarea
              onChange={handleChange}
              placeholder="Observation..."
              rows={6}
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
        <div className="pt-8">
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </section>
    </>
  );
};

export default UpdateAdvancement;
