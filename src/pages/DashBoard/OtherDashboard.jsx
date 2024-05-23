import API from '../../utils/api-client'
import { useState, useEffect } from 'react'
import { ErrorToast, LoadingToast } from '../../components/Globals/toasts'
import CountCard from './CountCard'
import { Bar } from 'react-chartjs-2'
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { LoadingAnimation } from '../../components/Globals'
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const Others = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const res = await API.get(`dashboard/other`)
      setData(res.data.data)
      setLoading(false)
    } catch (e) {
      setError(e.response.data.message)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fakedata = {
    labels: [
      'pending',
      'accepted',
      'refused ',
      'recourse',
      'accepted ar',
      'refused ar',
    ],
    datasets: [
      {
        label: 'Establishment projects',
        data: [
          data?.by_status.pending,
          data?.by_status.accepted,
          data?.by_status.refused,
          data?.by_status.recourse,
          data?.by_status['accepted after recourse'],
          data?.by_status['refused after recourse'],
        ],
        backgroundColor: [
          'rgba(255, 206, 86, 0.2)',
          'rgba(223, 255, 226, 0.5)',
          'rgba(255, 221, 221, 0.5)',
          'rgba(255, 230, 211, 0.5)',
          'rgba(223, 255, 226, 0.5)',
          'rgba(255, 221, 221, 0.5)',
        ],
        borderColor: [
          'rgba(255, 206, 86, 1)',
          'rgb(57, 123, 26)',
          'rgb(184, 0, 0)',
          'rgb(184, 99, 0)',
          'rgb(57, 123, 26)',
          'rgb(184, 0, 0)',
        ],
        borderWidth: 1,
      },
    ],
  }

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
          <div className='text-thirdColor text-fs-500 pb-6'>Statistics:</div>
          <div className='flex justify-center items-center gap-16'>
            <CountCard
              name='Projects in the establishment'
              number={
                data?.by_status.accepted +
                data?.by_status['accepted after recourse'] +
                data?.by_status.pending +
                data?.by_status.recourse +
                data?.by_status.refused +
                data?.by_status['refused after recourse']
              }
            />
          </div>
          <h1 className='text-thirdColor text-fs-500 pt-16'>
            By Acceptation Status:
          </h1>
          <div className='flex justify-center pt-4 pb-10'>
            <div className='w-3/4'>
              <Bar data={fakedata} options={options} />
            </div>
          </div>
          <p className='text-secondaryColor ml-20 text-fs-400 pb-16'>
            ar: After recourse
          </p>
        </section>
      )}
    </>
  )
}

export default Others
