import {
  NavCard,
  DropDownMenu,
  AuthCard,
  Modal,
} from "../../components/Globals";
import {
  ErrorToast,
  LoadingToast,
  SuccessToast,
} from "../../components/Globals/toasts";
import { routes } from "../../routes";
import { useState, useEffect } from "react";
import API from "../../utils/api-client";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const MyProject = () => {
  const navigate = useNavigate();
  const { auth } = useAuth()
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [canUpdate, setCanUpdate] = useState(false);
  const [success, setSuccess] = useState("");
  const [w,setW]=useState(0)
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  const fetchData = async () => {
    try {
      const res = await API.get(`projects/my`);
      if (!res.data.data.project) {
        setLoading(false);
        setProject(null);
        setError("You dont have any project currently !");
        await sleep(4000);
        navigate("/settings/profile");
      } else {
        setProject(res.data.data.project);
        const keys = Object.keys(res.data.data.project.progress);
        const progress = keys[keys.length - 1]
       progress ? setW(progress/100*24) : setW(0)
             const res2 = await API.get(`/periods`)
             const validationPeriod = res2.data.data.periods.find(
               (period) => period.name === 'projects submission period'
             )
             const currentDate = new Date()
             const startDate1 = new Date(validationPeriod.start_date)
             const endDate1 = new Date(validationPeriod.end_date)
             const recourseValidationPeriod = res2.data.data.periods.find(
               (period) => period.name === 'projects recourse period'
             )
             const startDate2 = new Date(recourseValidationPeriod.start_date)
             const endDate2 = new Date(recourseValidationPeriod.end_date)

             if (
               res.data.data.project.status === 'pending' &&
               currentDate >= startDate1 &&
               currentDate <= endDate1
             ) {
               setCanUpdate(true)
             } else if (
               res.data.data.project.status === 'recourse' &&
               currentDate >= startDate2 &&
               currentDate <= endDate2
             ) {
               setCanUpdate(true)
             } else {
               setCanUpdate(false)
             }
      }
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const handleWithdraw = async () => {
    try {
      setLoading(true);
      const res = await API.delete(`projects/${project.id}`);
      setSuccess(res.data.message);
    } catch (e) {
      setError(e.response.data.message);
    } finally {
      setOpen(false);
      setLoading(false);
      await sleep(4000);
      navigate("/settings/profile");
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {success && <SuccessToast message={success} />}
      {open && (
        <Modal title={'Confirmation'}>
          <div className='text-secondaryColor flex justify-center'>
            Are you sure you want to
            <span className='text-mainRed font-bold'>
              &nbsp;withdraw &nbsp;
            </span>
            your project?
          </div>

          <ul className='flex justify-between px-12 pt-8 pb-4'>
            <li
              onClick={handleWithdraw}
              className='text-mainGreen hover:cursor-pointer'
            >
              Confirm
            </li>
            <li
              onClick={() => {
                setOpen(false)
              }}
              className='text-mainRed hover:cursor-pointer'
            >
              Cancel
            </li>
          </ul>
        </Modal>
      )}
      {error && <ErrorToast message={error} />}
      {loading && <LoadingToast />}
      {project && (
        <section className='px-layout pb-8'>
          <div className='pt-8'>
            <div className='flex justify-between'>
              <AuthCard />
              {project.status !== 'accepted' &&
                project.status !== 'refused' &&
                auth.id === project.project_holder.id && (
                  <button
                    onClick={() => {
                      setOpen(true)
                    }}
                    className='text-mainRed pr-20'
                  >
                    Withdraw
                  </button>
                )}
            </div>

            <div className='pt-4 grid gap-6 max-w-[27.5rem]'>
              <DropDownMenu
                label={project.status}
                icon={'clipboard'}
                list={[]}
                iconColor={
                  project.status === 'pending'
                    ? 'stroke-mainPending'
                    : project.status === 'refused'
                    ? 'stroke-mainRed'
                    : project.status === 'accepted'
                    ? 'stroke-mainGreen'
                    : project.status === 'recourse'
                    ? 'stroke-mainRecourse'
                    : 'stroke-thirdColor'
                }
                title={project.status}
                className={`w-[27.5rem] ${
                  project.status === 'pending'
                    ? 'bg-lightPending text-mainPending'
                    : project.status === 'refused'
                    ? 'bg-lightRed text-mainRed'
                    : project.status === 'accepted'
                    ? 'bg-lightGreen text-mainGreen'
                    : project.status === 'recourse'
                    ? 'bg-lightRecourse text-mainRecourse'
                    : 'bg-secondBgColor '
                }`}
              />
              <div className='text-fs-400 text-thirdColor'>
                Project advancement
              </div>
              <div className='grid grid-flow-col gap-3'>
                <div className='bg-bgColor w-[24rem] h-3 rounded-lg self-center'>
                  <div
                    style={{ width: `${w}rem` }}
                    className='bg-primaryColor  h-3 rounded-lg'
                  />
                </div>
                <div className='self-center justify-self-center text-secondaryColor inline-block'>
                  {Math.floor((w * 100) / 24)} %
                </div>
              </div>

              <div className='text-fs-400 text-thirdColor'>Informations</div>
              <NavCard
                text={'View project details'}
                icon={'teacher'}
                link={routes.MY_PROJECT_DETAILS.path}
              />
              {auth.id === project.project_holder.id &&
                canUpdate &&
                project.status !== 'accepted' &&
                auth.permissions.find((e) => e.name === 'update-project') && (
                  <NavCard
                    text={'Edit my project'}
                    icon={'edit'}
                    link={routes.UPDATE_MY_PROJECT.path}
                  />
                )}
              {auth.permissions.find((e) => e.name === 'read-remark') && (
                <NavCard
                  text={'Remarks'}
                  icon={'note'}
                  link={`remarks/${project.id}`}
                />
              )}
              {project.status === 'accepted' &&
                auth.permissions.find((e) => e.name === 'read-task') && (
                  <NavCard
                    text={'Tasks'}
                    icon={'note-2'}
                    link={`${project.id}/tasks`}
                  />
                )}
              {project.status === 'accepted' &&
                auth.permissions.find((e) => e.name === 'read-comment') && (
                  <NavCard
                    text={'Comments'}
                    icon={'note'}
                    link={`comments/${project.id}`}
                  />
                )}
              {project.status === 'accepted' &&
                auth.permissions.find(
                  (e) => e.name === 'read-project-observation'
                ) && (
                  <NavCard
                    text={'Project Observations'}
                    icon={'teacher'}
                    link={`observations/${project.id}`}
                  />
                )}
              {project.defence_id &&
                auth.permissions.find((e) => e.name === 'read-defence') && (
                  <NavCard
                    text={'View defence'}
                    icon={'teacher'}
                    link={`defence/${project.defence_id}`}
                  />
                )}
            </div>
          </div>
        </section>
      )}
    </>
  )
};

export default MyProject;
