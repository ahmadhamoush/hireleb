import style from '@/styles/getStarted.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'
import Layout from '@/components/Layout'

const index = () => {
  const session = useSession()
  const router = useRouter()

  function navigate() {
    router.push('/post-a-job/summary')
  }
  function navigateBack() {
    router.push('/post-a-job/skills')
  }

  const {
    jobHourlyrate,
    setJobHourlyRate,
    jobLbpChecked,
    setJobLBPChecked,
    jobUsdChecked,
    setJobUSDChecked,
  } = useContext(GetStartedContext)

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
            <div>
              <label htmlFor={style.jobHourlyrate}>What is your hourly rate?*</label>
              <input
                value={jobHourlyrate}
                onChange={(e) => setJobHourlyRate(e.target.value)}
                type="number"
                id={style.jobHourlyrate}
                placeholder="Enter rate"
              />
              <div className={style.currencyContainer}>
                <label>Select Currency</label>
                <div>
                  <p>LBP</p>
                  <label className={style.hourlyLabel}>
                    <input
                      onChange={() => {
                        setJobLBPChecked((prev) => !prev)
                        setJobUSDChecked(false)
                      }}
                      checked={jobLbpChecked}
                      type="checkbox"
                    />
                    <div className={style.checkmark}></div>
                  </label>
                </div>
                <div>
                  <p>USD</p>
                  <label className={style.hourlyLabel}>
                    <input
                      onChange={() => {
                        setJobLBPChecked(false)
                        setJobUSDChecked((prev) => !prev)
                      }}
                      checked={jobUsdChecked}
                      type="checkbox"
                    />
                    <div className={style.checkmark}></div>
                  </label>
                </div>
              </div>
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
