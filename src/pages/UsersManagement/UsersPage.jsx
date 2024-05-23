import { Icon, LoadingAnimation, Input } from '../../components/Globals'
import UserRow from '../../components/UsersManagement/UsersPage/UserRow'
import { useState } from 'react'
import API from '../../utils/api-client'
import { useEffect } from 'react'
import { ErrorToast, LoadingToast } from '../../components/Globals/toasts'
import { useAuth } from '../../AuthContext'
import { useRef } from 'react'

const UsersTable = () => {
  const { auth } = useAuth()
  const pageSize = 5
  const searchRef = useRef(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [users, setUsers] = useState([])
  const [shown, setShown] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [toggleFilter, setToggleFilter] = useState(false)

  const toggle = () => setToggleFilter((tg) => !tg)

  const increment = () =>
    currentPage != Math.ceil(shown.length / pageSize) - 1 &&
    setCurrentPage((p) => p + 1)
  const decrement = () => currentPage != 0 && setCurrentPage((p) => p - 1)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const res = await API.get('/users')
      setUsers([...res.data.data.users].filter(e => e.id !== auth.id))
      setShown([...res.data.data.users].filter((e) => e.id !== auth.id))
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  const filterEnabled = () => {
    setShown((sh) => users.filter((u) => u.is_enabled))
    searchRef.current.value = ""
    toggle()
  }
  const filterDisabled = () => {
    setShown((sh) => users.filter((u) => !u.is_enabled))
    searchRef.current.value = ''
    toggle()
  }
  const filterStudent = () => {
    setShown((sh) => users.filter((u) => u.person_type === 'student'))
    searchRef.current.value = ''
    toggle()
  }
  const filterTeacher = () => {
    setShown((sh) => users.filter((u) => u.person_type === 'teacher'))
    searchRef.current.value = ''
    toggle()
  }
  const filterCommittee = () => {
    setShown((sh) =>
      users.filter((u) => u.person_type === 'scientific committee member')
    )
    searchRef.current.value = ''
    toggle()
  }
  const filterInternship = () => {
    setShown((sh) =>
      users.filter((u) => u.person_type === 'internship service member')
    )
    searchRef.current.value = ''
    toggle()
  }
  const filterHeadmaster = () => {
    setShown((sh) => users.filter((u) => u.person_type === 'headmaster'))
    searchRef.current.value = ''
    toggle()
  }
  const filterAll = () => {
    setShown((sh) => users)
    searchRef.current.value = ''
    toggle()
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <section className='pb-16'>
      {loading && <LoadingAnimation className='scale-[0.5]' />}
      {error && <ErrorToast message={error} />}
      <div className='pl-layout grid grid-cols-5 gap-3 text-secondaryColor pt-3'>
        <div>Username</div>
        <div>Email</div>
        <div>Phone</div>
        <div>Status</div>
        <div className='flex items-center gap-2 relative pl-4'>
          Filter
          <Icon
            icon='down'
            className={`stroke-secondaryColor cursor-pointer ${
              toggleFilter && 'rotate-180'
            }`}
            onClick={toggle}
          />
          <div
            className={`absolute bottom-0 translate-x-[-60px] translate-y-[105%] left-0 bg-white rounded-md shadow-md
          py-3 px-5 text-secondaryColor ${!toggleFilter && 'hidden'}`}
          >
            <p className='cursor-pointer mb-4' onClick={filterAll}>
              Show all
            </p>
            <p className='cursor-pointer mb-4' onClick={filterEnabled}>
              Show enabled
            </p>
            <p className='cursor-pointer mb-4' onClick={filterDisabled}>
              Show disabled
            </p>
            <p className='cursor-pointer mb-4' onClick={filterStudent}>
              Show students
            </p>
            <p className='cursor-pointer mb-4' onClick={filterTeacher}>
              Show teachers
            </p>
            <p className='cursor-pointer mb-4' onClick={filterHeadmaster}>
              Show headmasters
            </p>
            <p className='cursor-pointer mb-4' onClick={filterCommittee}>
              Show scientific committee
            </p>
            <p className='cursor-pointer' onClick={filterInternship}>
              Show internship service
            </p>
          </div>
        </div>
      </div>
      <ul className='mt-2'>
        {shown
          .slice(currentPage * pageSize, currentPage * pageSize + pageSize)
          .map((user) => (
            <UserRow key={user.id} user={user} />
          ))}
      </ul>
      <div className='flex justify-between items-center pr-12 pt-8 gap-2 text-secondaryColor'>
        <div className='pl-layout'>
          <Input
            icon='search'
            inputProps={{
              ref: searchRef,
              placeholder: 'Search By Email',
              onChange: (e) =>
                setShown((prev) =>
                  prev.filter((u) => u.email.includes(e.target.value))
                ),
            }}
            className='basis-[21.875rem]'
          />
        </div>
        <div className='flex gap-2'>
          <input
            onChange={(event) => {
              if (
                event.target.value <= Math.ceil(shown.length / pageSize) &&
                event.target.value > 0
              )
                setCurrentPage(event.target.value - 1)
            }}
            type='number'
            dir='rtl'
            value={currentPage + 1}
            className='self-end'
          />
          <span>of</span>
          <span>{Math.ceil(shown.length / pageSize)}</span>
          <div className=' flex gap-1'>
            <Icon
              icon={'left'}
              className={'stroke-secondaryColor hover:cursor-pointer'}
              onClick={decrement}
            />
            <Icon
              icon={'left'}
              className={
                'stroke-secondaryColor rotate-180 hover:cursor-pointer'
              }
              onClick={increment}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default UsersTable
