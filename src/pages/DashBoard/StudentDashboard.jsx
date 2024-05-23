import API from '../../utils/api-client'
import { useState, useEffect } from 'react'
import { ErrorToast, LoadingToast } from '../../components/Globals/toasts'
import { LoadingAnimation } from '../../components/Globals'

const Student = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      setError('')
      const res = await API.get(`/periods`)
      setData(res.data.data.periods)
      setLoading(false)
    } catch (er) {
      setLoading(false)
      setError(er.response.data.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }

  return (
    <>
      {loading && <LoadingAnimation className='scale-[0.5]' />}
      {error && <ErrorToast message={error} />}
      {!loading && (
        <section className='px-layout'>
          {data.map((period, index) => {
            return (
              <div
                key={index}
                className='text-secondaryColor text-fs-400 py-3 font-medium'
              >
                {period.name}
                <p className='text-thirdColor text-fs-300 py-2 font-normal'>
                  Start: {period.start_date}
                </p>
                <p className='text-thirdColor text-fs-300 font-normal'>
                  End: {period.end_date}
                </p>
              </div>
            )
          })}
        </section>
      )}
    </>
  )
}

export default Student
