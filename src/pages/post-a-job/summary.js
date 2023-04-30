import style from '@/styles/getStarted.module.css'
import axios from 'axios'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'
import Layout from '@/components/Layout'

const index = () => {
  const session = useSession()
  const router = useRouter()

  function postJob() {
    router.push('/freelancer/dashboard')
  }
  function navigateBack() {
    router.push('/post-a-job/hourly-rate')
  }

  const {
    jobHourlyrate,
    jobLbpChecked,
    jobUsdChecked,
    jobTitle,
    jobAbout,
    jobCategory,
    jobSubcategory,
    jobSkills,
    jobExperience,
  } = useContext(GetStartedContext)

  const handleUpload = async () => {
    try {
      const formData = new FormData()
      if (selectedFile !== '') {
        formData.append('email', session.data.user.email)
        formData.append('hourlyrate', jobHourlyrate)
        formData.append('title', jobTitle)
        formData.append('desc', jobAbout)
        formData.append('category', jobCategory)
        formData.append('skills', jobSkills)
        formData.append('subcategory', jobSubcategory)
        formData.append('experience', jobExperience)
        formData.append('currency', jobLbpChecked ? 'LBP' : 'USD')
        const { data } = await axios.post('/api/post-job', formData)
        if (data.done === 'ok') {
          console.log(data)
        }
      } else {
        throw new Error('Values should not be empty')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Layout>
      <Animate play start={{ width: '80%' }} end={{ width: '100%' }}>
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
            <h2>Job Summary</h2>
            <div className={style.summary}>
              <div>
                <h3>Job Title</h3>
                <p>{jobTitle}</p>
                <h3>Job Description</h3>
                <p>{jobAbout}</p>
                <h3>Job Category</h3>
                <p>{jobCategory}</p>
                <h3>Job Subcategory</h3>
                <p>{jobSubcategory}</p>
                <h3>Skills</h3>
                <div className={style.displayedSkillsContainer}>
                  {jobSkills.map((skill, index) => {
                    return (
                      <div key={index} className={style.displayedSkills}>
                        {jobSkills.length && <p>{skill}</p>}
                      </div>
                    )
                  })}
                </div>
                <h3>Experience</h3>
                <p>{jobExperience}</p>
                <h3>Hourly rate</h3>
                <p>{jobHourlyrate}</p>
                <h3>Currency</h3>
                {jobLbpChecked && <p>LBP</p>}
                {jobUsdChecked && <p>USD</p>}
              </div>
            </div>
          </div>
          <div className={style.btns}>
            <button type="button" onClick={navigateBack}>
              Back
            </button>
            <button type="button" onClick={handleUpload}>
              Post Job
            </button>
          </div>
        </Animate>
      </div>
    </Layout>
  )
}

export default index
