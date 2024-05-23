import { Remark } from "../../components/Globals";
import API from "../../utils/api-client";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { useAuth } from "../../AuthContext";

const AddRemarks = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const [remark, setRemark] = useState("");
  const [remarks, setRemarks] = useState([]);
  const [success, setSuccess] = useState("");
  async function handleDelete(index,id) {
    try {
      setSuccess("");
      setLoading(true);
      const res = await API.delete(`/remarks/${id}`);
      setRemarks((prevR) => {
        const newR = [...prevR];
        newR.splice(index, 1);
        return newR;
      });
      setLoading(false);
      setSuccess(res.data.message);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  }
  async function handleUpdate(index, oldRemark, value) {
    try {
      setSuccess("");
      setLoading(true);
      const new_remark = {
        ...oldRemark,
        content: value,
      };
      const res = await API.put(`/remarks`, {
        id: oldRemark.id,
        content: value,
      });
      setLoading(false);
      setRemarks((existingItems) => {
        return [
          ...existingItems.slice(0, index),
          new_remark,
          ...existingItems.slice(index + 1),
        ];
      });
      setSuccess(res.data.message);
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  }
  async function handleAdd() {
    try {
      setLoading(true);
      setSuccess("");
      const res = await API.post(`/remarks`, {
        project_id: id,
        content: remark,
      });
      setRemarks([...remarks, res.data.data.remark]);
      setLoading(false);
      setSuccess(res.data.message);
      setRemark("");
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  }

  const fetchData = async () => {
    try {
      const res = await API.get(`/remarks/project/${id}`);
      setRemarks(res.data.data.remarks);
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
      {success && <SuccessToast message={success} />}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}

      <section className='px-layout pb-8'>
        <div className='text-secondaryColor text-fs-400 font-medium'>
          Committee remarks
        </div>
        <p className='text-fs-300 text-thirdColor max-w-[26rem] pt-2'>
          You will find here project remarks added by the scientific committee.
          A remark is a way for the committee to contact the project team. A
          remark can be added, updated or deleted by the committee. Project
          holder, members and supervising team can view these remarks.
        </p>
        <ul className='py-8'>
          {remarks.map((remark, index) => {
            return (
              <li key={remark.id}>
                <Remark
                  old_remark={remark}
                  index={index}
                  isAdmin={remark.user.id === auth.id}
                  name={
                    remark.user.person.first_name +
                    ' ' +
                    remark.user.person.last_name
                  }
                  time={remark.created_at}
                  remark={remark.content}
                  handleDelete={handleDelete}
                  handleSubmit={handleUpdate}
                  pic={remark.user.photo_url}
                  edit={remark.updated_at}
                />
              </li>
            )
          })}
        </ul>

        {auth?.permissions.find((e) => e.name === 'create-remark') && (
          <div className='flex justify-between max-w-[27rem] pl-2'>
            <div className='flex gap-4'>
              <img
                src={auth.photo_url}
                alt='profile pic'
                className='h-8 w-8 rounded-full object-cover'
              />
              <input
                value={remark}
                onChange={(e) => {
                  setRemark(e.target.value)
                }}
                type='text'
                className='w-[20rem]'
              />
            </div>
            <button
              onClick={() => {
                if (remark.trim().length > 5) {
                  handleAdd()
                }
              }}
              className='text-primaryColor text-fs-400'
            >
              Add
            </button>
          </div>
        )}
      </section>
    </>
  )
};

export default AddRemarks;
