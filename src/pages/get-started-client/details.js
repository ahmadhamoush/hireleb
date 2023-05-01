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
    title,
    setTitle,
    about,
    setAbout,
    category,
    setCategory,
    subcategory,
    setSubCategory,
  } = useContext(GetStartedContext)

  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  function navigate() {
    let valid = true
    if (title === '') {
      valid = false
      toast('Title is not valid')
    }
    if (about === '') {
      valid = false
      toast('About is not valid')
    }
    if (category === '') {
      valid = false
      toast('Select Category')
    }
    if (subcategory === '') {
      valid = false
      toast('Select Subcategory')
    }
    if (valid) {
      router.push('/get-started-client/skills')
    }
  }
  function navigateBack() {
    router.push('/get-started-client')
  }

  return (
    <Layout>
      <Animate play start={{ width: '20%' }} end={{ width: '40%' }}>
        <div className={style.scroll}></div>
      </Animate>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Welcome {session.data?.user.email},</h1>
          <p>
            Post your job requirements and find the best freelancers on our
            platform! Connect with skilled professionals and complete your
            project on time and within budget.
          </p>
        </div>
        <Animate
          className={style.animate}
          play
          start={{ opacity: 0 }}
          end={{ opacity: 1 }}
        >
          <div className={style.freelanceDetails}>
            <h3>SHARE YOUR CLIENT DETAILS</h3>
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
                placeholder="Describe yourself for freelancers"
              />
            </div>
            <div>
              <label htmlFor={style.category}>Preferred Category*</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id={style.category}
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
              <label htmlFor={style.subcategory}>Preferred Subcategory*</label>
              <select
                value={subcategory}
                onChange={(e) => setSubCategory(e.target.value)}
                id={style.subcategory}
              >
                {' '}
                <option value="">Select Subcategory</option>
                {categoriesList
                  .filter((categoryList) => categoryList.name === category)
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
