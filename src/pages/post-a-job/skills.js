import style from '@/styles/getStarted.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import jobCategories from '../../../lib/jobCategories'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'

const Skills = () => {
  const session = useSession()
  const router = useRouter()

  const [categoriesList, setCategoriesList] = useState([])

  const {
    jobSkills,
    setJobSkills,
    jobExperience,
    setJobExperience,
    jobCategory,
    jobSubcategory,
  } = useContext(GetStartedContext)
  function navigate() {
    let valid = true
    if (!jobSkills.length) {
      toast('Select Skills')
      valid = false
    }
    if (jobExperience === '') {
      toast('Select Experience')
      valid = false
    }
    if (valid) {
      router.push('/post-a-job/payment')
    }
  }
  function navigateBack() {
    router.push('/post-a-job')
  }

  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  return (
    <Layout>
      <Animate play start={{ width: '40%' }} end={{ width: '60%' }}>
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
            <h3>SELECT REQUIRED SKILLS FOR JOB</h3>
            <div>
              <label htmlFor={style.jobSkills}>Required Skills*</label>
              <select
                multiple={true}
                onChange={(e) =>
                  setJobSkills((prev) => [...new Set(prev).add(e.target.value)])
                }
                id={style.jobSkills}
              >
                {categoriesList
                  .filter((categoryList) => categoryList.name === jobCategory)
                  .map((list) =>
                    list.subcategories
                      .filter((subcat) => subcat.name === jobSubcategory)
                      .map((sub) =>
                        sub.skills.map((skill, index) => {
                          return (
                            <option key={index} value={skill}>
                              {skill}
                            </option>
                          )
                        }),
                      ),
                  )}
              </select>
              <div className={style.displayedSkillsContainer}>
                {jobSkills.map((skill, index) => {
                  return (
                    <div key={index} className={style.displayedSkills}>
                      {jobSkills.length && <p>{skill}</p>}
                      <FontAwesomeIcon
                        onClick={(e) =>
                          setJobSkills((prev) =>
                            prev.filter(
                              (skill, prevIndex) => prevIndex !== index,
                            ),
                          )
                        }
                        className={style.close}
                        icon={faClose}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            <div>
              <label htmlFor={style.jobExperience}>
                Required Experience Level
              </label>
              <select
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                id={style.jobExperience}
              >
                {' '}
                <option value="">Select Experience</option>
                <option value="entry level">Entry Level</option>
                <option value="mid level">Mid Level</option>
                <option value="senior level">Senior Level</option>
                <option value="managerial">Managerial</option>
                <option value="executive">Executive</option>
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
    </Layout>
  )
}

export default Skills
