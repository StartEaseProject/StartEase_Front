import API from "../../utils/api-client";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../../AuthContext";

import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import Comment from "./Comment";
const AddComments = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { auth } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const [success, setSuccess] = useState("");
  async function handleDelete(oldCommentId, index) {
    try {
      setSuccess("");
      setLoading(true);
      const res = await API.delete(`/comments/${oldCommentId}`);
      setComments((prevR) => {
        const newR = [...prevR];
        newR.splice(index, 1);
        return newR;
      });
      setLoading(false);
      setSuccess(res.data.message);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }
  async function handleUpdate(index, oldComment, value) {
    try {
      setSuccess("");
      setLoading(true);

      const res = await API.put(`/comments/${oldComment.id}`, {
        content: value,
      });
      const newComment = {
        ...oldComment,
        content: value,
      };
      setComments((existingItems) => {
        return [
          ...existingItems.slice(0, index),
          newComment,
          ...existingItems.slice(index + 1),
        ];
      });
      setSuccess(res.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }

  async function handleAdd() {
    try {
      setLoading(true);
      setSuccess("");
      const newComment = {
        content: comment,
        project_id: id,
      };
      const res = await API.post("/comments", newComment);
      setComments([...comments, res.data.data.comment]);
      setSuccess(res.data.message);
      setComment("");
      setLoading(false)
    } catch (e) {
      setLoading(false);
      setError(e.response.data.message);
    }
  }

  async function handleAddReply(index, replyComment) {
    try {
      setSuccess("");
      setLoading(true);
      const newComments = [...comments];
      const res = await API.post("/comments/reply", replyComment);
      newComments[index].replies.push(res.data.data.comment);
      setSuccess(res.data.message);
      setComments(newComments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }

  const handleUpdateReply = async (
    commentIndex,
    replyIndex,
    oldComment,
    value,
    replyId
  ) => {
    try {
      setSuccess("");
      setLoading(true);
      const res = await API.put(`/comments/${replyId}`, {
        content: value,
      });
      const newComment = {
        ...oldComment,
        content: value,
      };
      setSuccess(res.data.message);
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        const updatedComment = { ...updatedComments[commentIndex] };
        const updatedReplies = [...updatedComment.replies];
        (updatedReplies[replyIndex] = newComment),
          (updatedComment.replies = updatedReplies);
        updatedComments[commentIndex] = updatedComment;
        return updatedComments;
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const handleDeleteReply = async (commentIndex, replyIndex, oldComment) => {
    try {
      setSuccess("");
      setLoading(true);
      const res = await API.delete(`/comments/${oldComment.id}`);
      setComments((prevComments) => {
        const updatedComments = [...prevComments];
        const updatedComment = updatedComments[commentIndex];
        const updatedReplies = [...updatedComment.replies];
        updatedReplies.splice(replyIndex, 1);
        (updatedComment.replies = updatedReplies),
          (updatedComments[commentIndex] = updatedComment);
        return updatedComments;
      });
      setSuccess(res.data.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  const fetchData = async () => {
    try {
      const res = await API.get(`/comments/project/${id}`);
      setComments(res.data.data.comments);
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

      <section className="px-layout pb-8">
        <div className="text-secondaryColor text-fs-400 font-medium">
          Project comments
        </div>
        <p className="text-fs-300 text-thirdColor max-w-[26rem] pt-2">
          In this page, you will find comments exchanged between the supervisor,
          co-supervisor, project holder and project members. You can add a
          comment, update or delete your comments and reply to other people's
          comments.
        </p>
        <ul className="py-8">
          {comments.map((comment, index) => {
            const commentId = uuidv4(); 
            return (
              <li key={commentId}>
                <Comment
                  canReply={auth.permissions.find(
                    (e) => e.name === 'create-comment'
                  )}
                  handleAddReply={handleAddReply}
                  handleDeleteReply={handleDeleteReply}
                  handleSubmitReply={handleUpdateReply}
                  handleSubmit={handleUpdate}
                  handleDelete={handleDelete}
                  old_Comment={comment}
                  name={
                    comment.user.person.first_name +
                    ' ' +
                    comment.user.person.last_name
                  }
                  isAdmin={comment.user.id == auth.id}
                  id={index}
                  time={comment.created_at}
                  comment={comment.content}
                  replies={comment.replies.length}
                  pic={comment.user.photo_url}
                />
              </li>
            )
          })}
        </ul>

        {auth.permissions.find(e => e.name==="create-comment") && <div className="flex justify-between max-w-[27rem] pl-2">
          <div className="flex gap-4">
            <img
              src={auth.photo_url}
              alt="profile pic"
              className="h-8 w-8 rounded-full object-cover"
            />
            <input
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              type="text"
              className="w-[20rem]"
            />
          </div>
          <button
            onClick={() => {
              if (comment) {
                handleAdd();
              }
            }}
            className="text-primaryColor text-fs-400"
          >
            Add
          </button>
        </div>}
      </section>
    </>
  );
};

export default AddComments;
