import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import style from '@/styles/Add.module.css'
import { Animate } from 'react-simple-animate'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import jobCategories from '../../../../lib/jobCategories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { initMongoose } from '../../../../lib/initMongoose'
import { getService } from '@/pages/api/get-services'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'

const EditService = ({ service }) => {
  const session = useSession()
  const router = useRouter()

  function navigateBack() {
    router.back()
  }

  const [name, setName] = useState(service[0].name)
  const [desc, setDesc] = useState(service[0].desc)
  const [categoriesList, setCategoriesList] = useState([])
  const [category, setCategory] = useState(service[0].category)
  const [subcategory, setSubCategory] = useState(service[0].subcategory)
  const [credits, setCredits] = useState(service[0].credits)
  const [payment, setPayment] = useState(service[0].payment)
  const [delivery, setDelivery] = useState(service[0].delivery)
  const [duration, setDuration] = useState(service[0].duration)
  const [durationTime, setDurationTime] = useState(service[0].time)
  const [experience, setExperience] = useState(service[0].experience)
  const [skills, setSkills] = useState(service[0].skills.split(','))
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  const handleUpload = async () => {
    setLoading(true)
    let valid = true
    if (name === '') {
      toast('Name is not valid')
      valid = false
    }
    if (desc === '') {
      toast('Description is not valid')
      valid = false
    }
    if (category === '') {
      toast('Category is not valid')
      valid = false
    }
    if (!skills.length) {
      toast('Select Skills')
      valid = false
    }
    if (subcategory === '') {
      toast('Subcategory is not valid')
      valid = false
    }
    if (experience === '') {
      toast('Experience is not valid')
      valid = false
    }
    if (payment === '') {
      toast('Payment is not valid')
      valid = false
    }
    if (credits === '') {
      toast('credits is not valid')
      valid = false
    }
    if (duration === '') {
      toast('Duration is not valid')
      valid = false
    }
    if (delivery === '') {
      toast('Delivery is not valid')
      valid = false
    }
    if (durationTime === '') {
      toast('Duration time is not valid')
      valid = false
    }
    if (valid) {
      try {
        const formData = new FormData()
        formData.append('id', service[0]._id)
        formData.append('name', name)
        formData.append('desc', desc)
        formData.append('category', category)
        formData.append('skills', skills)
        formData.append('subcategory', subcategory)
        formData.append('experience', experience)
        formData.append('payment', payment)
        formData.append('credits', credits)
        formData.append('duration', duration)
        formData.append('delivery', delivery)
        formData.append('time', durationTime)
        const { data } = await axios.post('/api/edit-service', formData)
        if (data) {
          setLoading(false)
          toast('Service Saved')
          router.push(`/freelancer/${session.data.user.email}`)
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      setLoading(false)
    }
  }
  return (
    <Layout>
      {loading && <Loader />}
      <Animate
        className={style.animate}
        play
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
      >
        <div className={style.container}>
          <div className={style.header}>
            <h1>Edit Service ({service[0].name})</h1>
          </div>
          <div className={style.projectDetails}>
            <h3>EDIT SERVICE DETAILS</h3>
            <div>
              <label htmlFor={style.name}>Service Name*</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                id={style.name}
                placeholder="Enter Service Name"
              />
            </div>
            <div>
              <label htmlFor={style.desc}>Service Description*</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="8"
                cols="30"
                id={style.desc}
                placeholder="Describe your service"
              />
            </div>
            <div>
              <label htmlFor={style.category}>Category*</label>
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
              <label htmlFor={style.subcategory}>Subcategory*</label>
              <select
                value={subcategory}
                onChange={(e) => setSubCategory(e.target.value)}
                id={style.subcategory}
              >
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
            <div>
              <label htmlFor={style.skills}>Service Skills*</label>
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
              <label htmlFor={style.experience}>Service Experience Level</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                id={style.experience}
              >
                <option value="">Select Service Experience</option>
                <option value="entry level">Entry Level</option>
                <option value="mid level">Mid Level</option>
                <option value="senior level">Senior Level</option>
                <option value="managerial">Managerial</option>
                <option value="executive">Executive</option>
              </select>
            </div>
            <div>
              <label htmlFor={style.payment}>Service Payment*</label>
              <select
                value={payment}
                onChange={(e) => setPayment(e.target.value)}
                id={style.payment}
              >
                <option value="">Select Payment Type</option>
                <option value="fixed">Fixed Fee</option>
                <option value="hourly">Hourly Rate</option>
              </select>
            </div>
            <h3>
              The amount of credits that will be charged for the service
              provided.{' '}
              <span style={{ color: '#2d646d' }}>(1 Credit = 1 USD)</span>
            </h3>
            <div>
              <label htmlFor={style.credits}>Service credits*</label>
              <input
                value={credits}
                onChange={(e) => setCredits(e.target.value)}
                id={style.credits}
                placeholder={`Enter Credits ${
                  payment === 'hourly' ? '/hr' : ''
                }`}
              />
            </div>{' '}
            <div>
              <label htmlFor={style.delivery}>Service Delivery*</label>
              <select
                value={delivery}
                onChange={(e) => setDelivery(e.target.value)}
                id={style.payment}
              >
                <option value="">Select Service Delivery</option>
                <option value="remote">Remote</option>
                <option value="onsite">On Site</option>
              </select>
            </div>
            <div>
              <label htmlFor={style.duration}>Service Duration*</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                id={style.duration}
              >
                <option value="">Select Service Duration</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
              </select>
            </div>
            {duration.length > 0 && (
              <div>
                <label htmlFor={style.durationTime}>
                  Service Duration Time*
                </label>
                <input
                  value={durationTime}
                  onChange={(e) => setDurationTime(e.target.value)}
                  id={style.durationTime}
                  placeholder={`The estimated time it will take to complete the service in ${duration}.`}
                />
              </div>
            )}
            <div className={style.btns}>
              <button type="button" onClick={navigateBack}>
                Back
              </button>
              <button type="button" onClick={handleUpload}>
                SAVE
              </button>
            </div>
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default EditService
export async function getServerSideProps(context) {
  //destructuring context object to get id param
  const { query } = context
  const { id } = query
  //getting session details
  const session = await getSession(context)
  //connecting to db
  await initMongoose()
  //getting project based on query id
  let service = await getService(id)
  let authenticated = false
  //checking if logged user owns the project
  if (session.user.email === service[0].freelancer) {
    authenticated = true
  } else {
    service = []
  }
  return {
    props: {
      service: JSON.parse(JSON.stringify(service)),
      authenticated,
    },
  }
}
