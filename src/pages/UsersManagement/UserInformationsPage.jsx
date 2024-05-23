import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LoadingToast } from '../../components/Globals/toasts'
import API from '../../utils/api-client'
import UserProfileCard from '../../components/UsersManagement/UserProfileCard'
import AdminProfile from '../../components/UsersManagement/Profiles/AdminProfile'
import { CommitteeProfile, HeadmasterProfile, InternshipProfile, StudentProfile, TeacherProfile } from '../../components/UsersManagement/Profiles'
import { LoadingAnimation } from '../../components/Globals'
import NotFound from '../NotFound'

const UserInformationsPage = () => {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const fetchUsers = async () => {
    try {
      const res = await API.get(`/users/${id}`)
      setUser(res.data.data.user)
    } catch (e) {}
    setLoading(false)
  }
  useEffect(() => {
    fetchUsers()
  }, [])

  if (loading) return <LoadingAnimation className='scale-[0.5]' />
  if(!loading && !user) return <NotFound />
  if (user)
    return (
      <section className='px-layout pt-8'>
        <UserProfileCard user={user} />
        {user?.person_type === 'student' && <StudentProfile user={user} />}
        {user?.person_type === 'teacher' && <TeacherProfile user={user} />}
        {user?.person_type === 'headmaster' && <HeadmasterProfile user={user}/>}
        {user?.person_type === 'scientific committee member' && (
          <CommitteeProfile user={user}/>
        )}
        {user?.person_type === 'internship service member' && (
          <InternshipProfile user={user}/>
        )}
        {user?.person_type === null && <AdminProfile user={user}/>}
      </section>
    )
}

export default UserInformationsPage
