import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import style from '@/styles/getStarted.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/router'

const index = () => {
  const session = useSession()
  const router = useRouter()

  function navigate() {
    router.push('/get-started/hourly-rate')
  }
  function navigateBack() {
    router.push('/get-started/freelancer-details')
  }

  return (
    <div>
      <Navbar />
      <Animate play start={{ width: '40%' }} end={{ width: '60%' }}>
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
            <h3>SHARE YOUR SKILLS WITH US</h3>
            <div>
              <label htmlFor={style.skills}>Your Skills*</label>
              <select id={style.skills}>
                <option>Select Skills</option>
              </select>
            </div>
            <div>
              <label htmlFor={style.experience}>
                Experience Level (Optional)
              </label>
              <select id={style.experience}>
                <option>Select your experience level </option>
              </select>
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
      <Footer />
    </div>
  )
}

export default index
