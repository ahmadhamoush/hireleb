import style from '@/styles/getStarted.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import GetStartedContext from '@/components/GetStartedContext'
import jobCategories from '../../../lib/jobCategories'
import Layout from '@/components/Layout'
import { toast } from 'react-toastify'

const index = () => {
  const session = useSession()
  const router = useRouter()
  const [categoriesList, setCategoriesList] = useState([])

  const {
    jobTitle,
    setJobTitle,
    jobAbout,
    setJobAbout,
    jobCategory,
    setJobCategory,
    jobSubcategory,
    setJobSubCategory,
  } = useContext(GetStartedContext)

  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  function navigate() {
    let valid = true
    if (jobTitle === '') {
      toast('Job title is invalid')
      valid = false
    }
    if (jobAbout === '') {
      toast('Job description is invalid')
      valid = false
    }
    if (jobCategory === '') {
      toast('Select job category')
      valid = false
    }
    if (jobSubcategory === '') {
      toast('Select job subcategory')
      valid = false
    }
    if (valid) {
      router.push('/post-a-job/skills')
    }
  }
  function navigateBack() {
    router.back()
  }

  return (
    <Layout>
      <Animate play start={{ width: '0%' }} end={{ width: '10%' }}>
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
            <h3>SHARE YOUR JOB DETAILS</h3>
            <div>
              <label htmlFor={style.jobTitle}>Job title*</label>
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                id={style.jobTitle}
                placeholder="Enter type of work needed to be done"
              />
            </div>
            <div>
              <label htmlFor={style.jobAbout}>Describe Your Job*</label>
              <textarea
                value={jobAbout}
                onChange={(e) => setJobAbout(e.target.value)}
                rows="8"
                cols="30"
                id={style.jobAbout}
                placeholder="Describe your project or job requirements. Example: Looking for a talented graphic designer to create a modern and unique logo for my new business."
              />
            </div>
            <div>
              <label htmlFor={style.jobCategory}>Category*</label>
              <select
                value={jobCategory}
                onChange={(e) => setJobCategory(e.target.value)}
                id={style.jobCategory}
              >
                <option value="">Select Category</option>
                {categoriesList.map((list, index) => {
                  return (
                    <option key={index} value={list.name}>
                      {list.name}
                    </option>
                  )
                })}
              </select>
            </div>
            <div>
              <label htmlFor={style.jobSubcategory}>Subcategory*</label>
              <select
                value={jobSubcategory}
                onChange={(e) => setJobSubCategory(e.target.value)}
                id={style.jobSubcategory}
              >
                <option value="">Select Subcategory</option>
                {categoriesList
                  .filter((categoryList) => categoryList.name === jobCategory)
                  .map((list) =>
                    list.subcategories.map((subcat, index) => {
                      ;<option>Select</option>
                      return (
                        <option key={index} value={subcat.name}>
                          {subcat.name}
                        </option>
                      )
                    }),
                  )}
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
