import { useState, useEffect } from "react";
import Attachment from "../Project management/Attachement";
import { Button } from "../../components/Globals";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";

const SubmitTask = () => {
  const { id } = useParams();
  const [description, setDescription] = useState("");
  const [wordCount, setWordsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [required, setRequired] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [names, setNames] = useState([]);
  const MAX_WORDS = 100;

  const handleUpload = (newItem, name, position) => {
    setAttachments((prevItems) => {
      const updatedItems = prevItems.map((item, index) =>
        index === position ? newItem : item
      );
      updatedItems[position] = newItem;
      return updatedItems;
    });
    setNames((prevItems) => {
      const updatedItems = prevItems.map((item, index) =>
        index === position ? name : item
      );
      updatedItems[position] = name;
      return updatedItems;
    });
  };

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
  const fetchData = async () => {
    try {
      const res = await API.get(`/tasks/${id}`);
      setRequired(
        Object.entries(res.data.data.task.resources).map(([key, value]) => ({
          key,
          value,
        }))
      );

      setLoading(false);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    try {
      setError("");
      setSuccess("");
      setLoading(true);
      const formData = new FormData();
      formData.append("_method", "POST");
      for (let i = 0; i < attachments.length; i++) {
        formData.append("resources[]", attachments[i]);
      }
      const filteredNames = names.filter((name) => name !== "");
      for (let i = 0; i < filteredNames.length; i++) {
        formData.append("names[]", filteredNames[i]);
      }
      formData.append("submission_description", description);
      const res = await API.post(`/tasks/${id}/submit`, formData);
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setError(error.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {success && <SuccessToast message={success} />}
      {loading && <LoadingToast />}
      {error && <ErrorToast message={error} />}
      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          Task submission
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[28rem] pt-2">
          In this page, you as a project member can submit the final work of
          this task. Please provide a small description of your team’s work and
          the required files.
        </p>
        <div className="max-w-[22.5rem]">
          <div className="text-thirdColor text-fs-400 pb-3 pt-8">
            Informations
          </div>
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
          <div className="text-thirdColor text-fs-400 pb-3 pt-8">
            Required attachments
          </div>
          <ul className="pb-8">
            {required.map((item, index) => {
              return (
                <Attachment
                  key={index}
                  id={item.key}
                  title={item.key}
                  isEdit={false}
                  isUpload={true}
                  index={index}
                  isDownload={false}
                  handleUpload={handleUpload}
                />
              );
            })}
          </ul>
          <Button onClick={handleSubmit}>Submit</Button>
        </div>
      </section>
    </>
  );
};

export default SubmitTask;
