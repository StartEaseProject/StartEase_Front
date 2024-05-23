import { useState } from "react";
import { useRef, useEffect } from "react";
import { Icon } from "../../components/Globals";
import { useAuth } from "../../AuthContext";
import Reply from "./Reply";
import { v4 as uuidv4 } from "uuid";

const Comment = ({
  canReply,
  old_Comment,
  isAdmin,
  comment,
  name,
  time,
  handleDelete,
  handleSubmit,
  handleDeleteReply,
  handleSubmitReply,
  handleAddReply,
  id,
  pic,
  edit,
  replies,
}) => {
  const { auth } = useAuth();
  const textareaRef = useRef(null);
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [r, setR] = useState(comment);
  const [temp, setTemp] = useState(comment);
  const [hide, setHide] = useState(false);
  const [new_comment, setComment] = useState("");
  const [reply, setReply] = useState(false);
  const toggleEdit = () => {
    setOpen(false);
    setEdit(true);
  };
  function handleChange(event) {
    setR(event.target.value);
  }
  function handleHide() {
    setHide(!hide);
  }
  function adjustRows() {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const height =
        textarea.scrollHeight -
        parseInt(getComputedStyle(textarea).paddingTop) -
        parseInt(getComputedStyle(textarea).paddingBottom) -
        parseInt(getComputedStyle(textarea).borderTopWidth) -
        parseInt(getComputedStyle(textarea).borderBottomWidth);
      textarea.style.height = height + "px";
    }
  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        !event.target.closest(".comment-container") &&
        event.target !== textareaRef.current
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    adjustRows();
  }, [r]);

  return (
    <>
      <div className='flex gap-4 py-4'>
        <img
          src={pic}
          alt='profile pic'
          className={`h-16 w-16 rounded-full object-cover"
          `}
        />
        <ul
          className={`flex justify-between min-w-[22rem]
          `}
        >
          <li className='flex flex-col relative'>
            <div
              className={`text-fs-300 text-thirdColor max-w-[22rem]
                  
              `}
            >
              {name}
            </div>
            <div>
              <textarea
                ref={textareaRef}
                onInput={adjustRows}
                rows={1}
                onChange={handleChange}
                className={`bg-transparent border-none w-[20rem] overflow-hidden  focus:outline-0 resize-none`}
                value={r}
                disabled={!isEdit}
              />
            </div>
            {isEdit && (
              <button
                onClick={async () => {
                  if (r.trim().length > 5) {
                    await handleSubmit(id, old_Comment, r.trim())

                    setTemp(r.trim())
                    setR(r.trim())
                    setEdit(false)
                    adjustRows()
                  }
                }}
                className='absolute bottom-0 text-primaryColor text-fs-300 right-0'
              >
                Save
              </button>
            )}
            {isEdit && (
              <button
                onClick={() => {
                  setEdit(false)
                  setR(temp.trim())
                  adjustRows()
                }}
                className='absolute bottom-0 text-primaryColor text-fs-300 right-12'
              >
                Cancel
              </button>
            )}
            <div className={'flex gap-3 text-fs-200'}>
              <div className=' text-thirdColor'>
                {edit ? `edited ${edit}` : time}
              </div>

              <button
                onClick={() => {
                  setReply(!reply)
                }}
                className='text-primaryColor'
              >
                reply
              </button>

              {hide && (
                <button onClick={handleHide} className='text-primaryColor'>
                  hide replies
                </button>
              )}
              {!hide && replies > 0 && (
                <button onClick={handleHide} className='text-primaryColor'>
                  view replies {`(${replies})`}
                </button>
              )}
            </div>
          </li>

          {isAdmin && (
            <li className='comment-container'>
              <section className='relative'>
                <Icon
                  onClick={() => {
                    setOpen(!isOpen)
                  }}
                  icon={'more'}
                  className={'stroke-primaryColor hover:cursor-pointer'}
                />
                {isOpen && (
                  <div className='absolute top-5 w-[8rem] z-10'>
                    <div className='bg-bgColor rounded-md'>
                      <ul
                        onClick={toggleEdit}
                        className='hover:bg-secondBgColor py-3 flex rounded-md gap-4 px-4 hover:cursor-pointer'
                      >
                        <li>
                          <Icon
                            icon={'edit'}
                            className={'stroke-secondaryColor h-5'}
                          />
                        </li>
                        <li>Edit</li>
                      </ul>
                      <ul
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            'Are you sure you want to delete this comment?'
                          )
                          if (confirmDelete) {
                            await handleDelete(old_Comment.id, id)
                            setOpen(false)
                          } else {
                            setOpen(false)
                          }
                        }}
                        className='hover:bg-secondBgColor py-3 flex rounded-md gap-4 px-4 hover:cursor-pointer'
                      >
                        <li>
                          <Icon
                            icon={'trash'}
                            className={'stroke-secondaryColor h-[23px]'}
                          />
                        </li>
                        <li>Delete</li>
                      </ul>
                    </div>
                  </div>
                )}
              </section>
            </li>
          )}
        </ul>
      </div>
      {hide &&
        old_Comment?.replies.map((comment, index) => {
          const commentId = uuidv4()
          return (
            <div key={commentId} className='pl-16'>
              <Reply
                old_Comment={comment}
                name={
                  comment.user.person.first_name +
                  ' ' +
                  comment.user.person.last_name
                }
                isAdmin={comment.user.id == auth.id}
                index={id}
                time={comment.created_at}
                comment={comment.content}
                replyIndex={index}
                handleDeleteReply={handleDeleteReply}
                handleSubmitReply={handleSubmitReply}
                id={comment.id}
                pic={comment.user.photo_url}
              />
            </div>
          )
        })}
      {((old_Comment?.replies && hide) ||
        reply ||
        !auth.permissions.find((e) => e.name === 'create-comment')) && (
        <div className='flex justify-between max-w-[19.5rem] pl-16 pb-8'>
          <div className='flex gap-4'>
            <img
              src={auth.photo_url}
              alt='profile pic'
              className='h-8 w-8 rounded-full object-cover'
            />
            <input
              value={new_comment}
              onChange={(e) => {
                setComment(e.target.value)
              }}
              type='text'
              className='w-[20rem]'
            />
          </div>
          <button
            onClick={async () => {
              await handleAddReply(id, {
                content: new_comment,
                parent_id: old_Comment.id,
              })
              setComment('')
            }}
            className='text-primaryColor text-fs-300'
          >
            Add
          </button>
        </div>
      )}
    </>
  )
};

export default Comment;
