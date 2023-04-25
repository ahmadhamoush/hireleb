import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import style from '@/styles/getStarted.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext} from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'
import Image from 'next/image'

const index = () => {
  const session = useSession()
  const router = useRouter()

  function getStarted() {
    router.push('/freelancer/dashboard')
  }
  function navigateBack() {
    router.push('/get-started/hourly-rate')
  }

  const {
    hourlyrate,
    lbpChecked,
    usdChecked,
    selectedImage,
    title,
    about,
    category,
    subcategory,
   skills,
   experience,

  } = useContext(GetStartedContext)

  return (
    <div>
      <Navbar />
      <Animate play start={{ width: '80%' }} end={{ width: '100%' }}>
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
            <h2>Summary</h2>
           <div className={style.summary}>
            {selectedImage && <Image
                    className={style.display}
                    src={selectedImage}
                    alt="profile picture"
                    width={120}
                    height={120}
                  />}
            <div>

              <h3>Job Title</h3>
              <p>{title}</p>
              <h3>About You</h3>
              <p>{about}</p>
              <h3>Category</h3>
              <p>{category}</p>
              <h3>Subcategory</h3>
              <p>{subcategory}</p>
              <h3>Skills</h3>
              <div className={style.displayedSkillsContainer}>
                {skills.map((skill, index) => {
                  return (
                    <div key={index} className={style.displayedSkills}>
                      {skills.length && <p>{skill}</p>}
                    </div>
                  )
                })}
              </div>
              <h3>Experience</h3>
              <p>{experience}</p>
              <h3>Hourly rate</h3>
              <p>{hourlyrate}</p>
              <h3>Currency</h3>
              {lbpChecked && <p>LBP</p>}
              {usdChecked && <p>USD</p>}
            </div>
            </div>
            </div>
            <div className={style.btns}>
              <button type="button" onClick={navigateBack}>
                Back
              </button>
              <button type="button" onClick={getStarted}>
                Get Started
              </button>
            </div>
        </Animate>
      </div>
      
      <Footer />
    </div>
    
  )
}

export default index
