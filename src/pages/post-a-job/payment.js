import style from '@/styles/getStarted.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'

const index = () => {
  const session = useSession()
  const router = useRouter()

  function navigate() {
    let valid = true
    if (jobCredits === '') {
      valid = false
      toast('Job credits is not valid')
    }
    if (jobPayment === '') {
      valid = false
      toast('Job payment is not valid')
    }
    if (valid) {
      router.push('/post-a-job/summary')
    }
  }
  function navigateBack() {
    router.push('/post-a-job/skills')
  }

  const { jobPayment, setJobPayment, jobCredits, setJobCredits } =
    useContext(GetStartedContext)

  return (
    <Layout>
      <Animate play start={{ width: '60%' }} end={{ width: '80%' }}>
        <div className={style.scroll}></div>
      </Animate>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Post a Job</h1>
          <p>
            Complete your profile today and start showcasing your skills as a
            freelancer on our platform!
          </p>
        </div>
        <Animate
          className={style.animate}
          play
          start={{ opacity: 0 }}
          end={{ opacity: 1 }}
        >
          <div className={style.freelanceDetails}>
            <h3>SHARE YOUR PAYMENT DETAILS</h3>

            <h3>
              The number of credits that applicants will receive upon completion
              of this job{' '}
              <span style={{ color: '#2d646d' }}>(1 Credit = 1 USD)</span>
            </h3>
            <div>
              <label htmlFor={style.payment}>Payment Type*</label>
              <select
                value={jobPayment}
                onChange={(e) => setJobPayment(e.target.value)}
                id={style.payment}
              >
                <option value="">Select Payment Type</option>
                <option value="fixed">Fixed Fee</option>
                <option value="hourly">Hourly Rate</option>
              </select>
            </div>

            <div>
              <label htmlFor={style.credits}>Credits*</label>
              <input
                value={jobCredits}
                onChange={(e) => setJobCredits(e.target.value)}
                id={style.credits}
                type="number"
                placeholder={`Enter Credits ${
                  jobPayment === 'hourly' ? '/hr' : ''
                }`}
              />
            </div>

            <div className={style.btns}>
              <button type="button" onClick={navigateBack}>
                Back
              </button>
              <button type="button" onClick={navigate}>
                Next
              </button>
            </div>
          </div>
        </Animate>
      </div>
    </Layout>
  )
}

export default index
