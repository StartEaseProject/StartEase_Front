import { useAuth } from '../../AuthContext'
import {
  AdminProfile,
  CommitteeProfile,
  HeadmasterProfile,
  InternshipProfile,
  ProfilePhotoEdit,
  StudentProfile,
  TeacherProfile,
} from '../../components/Profile'


const InformationsPage = () => {
  const { auth } = useAuth()
  return (
    <div className='px-layout pb-12 grid gap-[50px]'>
      <ProfilePhotoEdit />
      {auth?.person_type === 'student' && <StudentProfile />}
      {auth?.person_type === 'teacher' && <TeacherProfile />}
      {auth?.person_type === 'headmaster' && <HeadmasterProfile />}
      {auth?.person_type === 'scientific committee member' && (
        <CommitteeProfile />
      )}
      {auth?.person_type === 'Internship service member' && (
        <InternshipProfile />
      )}
      {auth?.person_type === null && <AdminProfile />}
    </div>
  )
}

export default InformationsPage
