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

  const {
    title,
    setTitle,
    about,
    setAbout,
    category,
    setCategory,
    subcategory,
    setSubcategory,
  } = useContext(GetStartedContext)

  function navigate() {
    router.push('/get-started/freelancer-skills')
  }
  function navigateBack() {
    router.push('/get-started/')
  }

  return (
    <div>
      <Navbar />
      <Animate play start={{ width: '20%' }} end={{ width: '40%' }}>
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
              <label htmlFor={style.title}>Job title*</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id={style.title}
                placeholder="What do you want to be known as? Example: Award Winning Web Developer"
              />
            </div>
            <div>
              <label htmlFor={style.about}>About You*</label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                rows="8"
                cols="30"
                id={style.about}
                placeholder="Describe yourself for clients"
              />
            </div>
            <div>
              <label htmlFor={style.category}>Category*</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id={style.category}
              >
                <option>Select Category</option>
              </select>
            </div>
            <div>
              <label htmlFor={style.subcategory}>Subcategory*</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                id={style.subcategory}
              >
                <option>Select Subcategory</option>
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
