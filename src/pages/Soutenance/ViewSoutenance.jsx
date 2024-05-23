import { useParams } from 'react-router-dom'
import { useAuth } from '../../AuthContext'
import { LoadingAnimation, NavCard } from '../../components/Globals'
import { useEffect, useState } from 'react'
import API from '../../utils/api-client'
import { ErrorToast, LoadingToast } from '../../components/Globals/toasts'
import { routes } from '../../routes'

const ViewSoutenance = () => {
  const { auth } = useAuth()
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [soutenance, setSoutenace] = useState(null)
  const [hasPassed, setHasPassed] = useState(false)

  const fetchSoutenace = async () => {
    try {
      const res = await API.get(`defences/${id}`)
      setSoutenace(res.data.data.defence)
      const currentDate = new Date()
      const combinedDateTime = new Date(
        `${res.data.data.defence.date}T${res.data.data.defence.time}`
      )
      if (combinedDateTime < currentDate) {
        setHasPassed(true)
      }
      setLoading(false)
    } catch (e) {
      setError(e.response.data.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSoutenace()
  }, [])

  return (
    <section className='px-layout pb-8'>
      {loading && <LoadingAnimation className='scale-[0.5]' />}
      {error && <ErrorToast message={error} />}
      {!loading && soutenance && (
        <div>
          <div className='text-fs-400 text-thirdColor py-6'>Defence Page</div>

          <div className='pt-4 grid gap-6 max-w-[27.5rem]'>
            <NavCard
              text={'Defence Details'}
              icon={'teacher'}
              link={`details`}
            />
            {auth.permissions.find((e) => e.name === 'update-defence') &&
              !soutenance.has_deliberation && (
                <NavCard
                  text={'Update Defence'}
                  icon={'teacher'}
                  link={`update-thesis`}
                />
              )}
            {auth.person_type === 'student' ? (
              <NavCard
                text={'View project'}
                icon={'teacher'}
                link={routes.MY_PROJECT.path}
              />
            ) : (
              <NavCard
                text={'View project'}
                icon={'teacher'}
                link={`/main-menu/project_management/${soutenance.project_id}`}
              />
            )}
            {soutenance.jurys.president.id === auth.id &&
              !soutenance.has_deliberation &&
              hasPassed && (
                <NavCard
                  text={'Add deliberation'}
                  icon={'teacher'}
                  link={`add-deliberation`}
                />
              )}
            {auth.permissions.find((e) => e.name === 'read-defence') &&
              soutenance.has_deliberation &&
              hasPassed && (
                <NavCard
                  text={'View deliberation'}
                  icon={'teacher'}
                  link={`deliberation`}
                />
              )}
          </div>
        </div>
      )}
    </section>
  )
}

export default ViewSoutenance
