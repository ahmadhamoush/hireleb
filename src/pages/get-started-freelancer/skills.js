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

const index = () => {
  const session = useSession()
  const router = useRouter()

  const [categoriesList, setCategoriesList] = useState([])

  const {
    skills,
    setSkills,
    experience,
    setExperience,
    category,
    subcategory,
  } = useContext(GetStartedContext)
  function navigate() {
    router.push('/get-started-freelancer/hourly-rate')
  }
  function navigateBack() {
    router.push('/get-started-freelancer/details')
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
              <select
                multiple={true}
                onChange={(e) =>
                  setSkills((prev) => [...new Set(prev).add(e.target.value)])
                }
                id={style.skills}
              >
                {categoriesList
                  .filter((categoryList) => categoryList.name === category)
                  .map((list) =>
                    list.subcategories
                      .filter((subcat) => subcat.name === subcategory)
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
                {skills.map((skill, index) => {
                  return (
                    <div key={index} className={style.displayedSkills}>
                      {skills.length && <p>{skill}</p>}
                      <FontAwesomeIcon
                        onClick={(e) =>
                          setSkills((prev) =>
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
              <label htmlFor={style.experience}>Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                id={style.experience}
              >
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

export default index
