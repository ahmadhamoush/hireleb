import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import style from '@/styles/getStarted.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'

const index = () => {
  const session = useSession()
  const router = useRouter()

  function navigate() {
    router.push('/freelancer/dashboard')
  }
  function navigateBack() {
    router.push('/get-started/freelancer-skills')
  }

  const {
    hourlyrate,
    setHourlyRate,
    lbpChecked,
    setLBPChecked,
    usdChecked,
    setUSDChecked,
  } = useContext(GetStartedContext)

  return (
    <div>
      <Navbar />
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
            <h3>SHARE YOUR FREELANCE DETAILS</h3>
            <div>
              <label htmlFor={style.title}>What is your hourly rate?*</label>
              <input
                value={hourlyrate}
                onChange={(e) => setHourlyRate(e.target.value)}
                type="number"
                id={style.title}
                placeholder="Enter rate"
              />
              <div className={style.currencyContainer}>
                <label>Select Currency</label>
                <div>
                  <p>LBP</p>
                  <label className={style.hourlyLabel}>
                    <input
                      onChange={() => {
                        setLBPChecked((prev) => !prev)
                        setUSDChecked(false)
                      }}
                      checked={lbpChecked}
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
                        setLBPChecked(false)
                        setUSDChecked((prev) => !prev)
                      }}
                      checked={usdChecked}
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
                Get Started
              </button>
            </div>
          </div>
        </Animate>
      </div>
      <Footer />
    </div>
  )
}

export default index
