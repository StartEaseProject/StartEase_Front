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

const Admin = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      const res = await API.get(`dashboard/admin`)
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
      'Defences',
      'Establishments',
      'Filieres',
      'Grades',
      'Projects',
      'Specialities',
    ],
    datasets: [
      {
        label: 'StartEase statistics',
        data: [
          data?.defence_count,
          data?.establishment_count,
          data?.filiere_count,
          data?.grade_count,
          data?.project_count,
          data?.speciality_count,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
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
              name='Headmasters'
              number={data?.user_count.headmaster}
            />
            <CountCard
              name='Internship service members'
              number={data?.user_count['internship service member']}
            />
            <CountCard
              name='Scientific committee members'
              number={data?.user_count['scientific committee member']}
            />
          </div>
          <div className='flex justify-center items-center gap-16 pt-16'>
            <CountCard name='Students' number={data?.user_count.student} />
            <CountCard name='Teachers' number={data?.user_count.teacher} />
          </div>

          <div className='flex justify-center py-16'>
            <div className='w-3/4'>
              <Bar data={fakedata} options={options} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default Admin
