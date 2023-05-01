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
    if (hourlyrate === '') {
      valid = false
      toast('Hourly rate is not valid')
    }
    if (valid) {
      router.push('/get-started-freelancer/summary')
    }
  }
  function navigateBack() {
    router.push('/get-started-freelancer/skills')
  }

  const { hourlyrate, setHourlyRate } = useContext(GetStartedContext)

  return (
    <Layout>
      <Animate play start={{ width: '60%' }} end={{ width: '80%' }}>
        <div className={style.scroll}></div>
      </Animate>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Welcome {session.data?.user.email},</h1>
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
              The preferred amount of credits to be charged for a service
              provided.{' '}
              <span style={{ color: '#2d646d' }}>(1 Credit = 1 USD)</span>
            </h3>
            <div>
              <label htmlFor={style.title}>What is your hourly rate?*</label>
              <input
                value={hourlyrate}
                onChange={(e) => setHourlyRate(e.target.value)}
                type="number"
                id={style.title}
                placeholder="Enter credits /hr"
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
