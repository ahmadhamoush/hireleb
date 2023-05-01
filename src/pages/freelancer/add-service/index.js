import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import style from '@/styles/Add.module.css'
import { Animate } from 'react-simple-animate'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import jobCategories from '../../../../lib/jobCategories'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const AddService = () => {
  const session = useSession()
  const router = useRouter()

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [categoriesList, setCategoriesList] = useState([])
  const [category, setCategory] = useState('')
  const [subcategory, setSubCategory] = useState('')
  const [price, setPrice] = useState('')
  const [payment, setPayment] = useState('')
  const [delivery, setDelivery] = useState('')
  const [duration, setDuration] = useState('')
  const [durationTime, setDurationTime] = useState('')
  const [lbpChecked, setLBPChecked] = useState(false)
  const [usdChecked, setUSDChecked] = useState(false)
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState([])

  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  function navigateBack(){
    router.back()
  }
  const handleUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('email', session.data.user.email)
      formData.append('name', name)
      formData.append('desc', desc)
      formData.append('category', category)
      formData.append('skills', skills)
      formData.append('subcategory', subcategory)
      formData.append('experience', experience)
      formData.append('currency', lbpChecked ? 'LBP' : 'USD')
      formData.append('payment', payment)
      formData.append('price', price)
      formData.append('duration', duration)
      formData.append('delivery', delivery)
      formData.append('time', durationTime)
      const { data } = await axios.post('/api/add-service', formData)
      if (data) {
        router.push(`/freelancer/${session.data.user.email}`)
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Layout>
      <Animate
        className={style.animate}
        play
        start={{ opacity: 0 }}
        end={{ opacity: 1 }}
      >
        <div className={style.container}>
          <div className={style.header}>
            <h1>Add New Service</h1>
            <p>
              Offer your skills to the world - add your services and start
              growing your freelance business today!
            </p>
          </div>
          <div className={style.projectDetails}>
            <h3>SHARE YOUR SERVICE DETAILS</h3>
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
            {payment === 'fixed' && (
              <div>
                <div>
                  <label htmlFor={style.price}>Service Price*</label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id={style.price}
                    placeholder="What do you want to charge for your service?"
                  />
                </div>{' '}
                <div className={style.currencyContainer}>
                  <label>Select preferred currency</label>
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
            )}
            {payment === 'hourly' && (
              <div>
                <div>
                  <label htmlFor={style.price}>Service Price*</label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    id={style.price}
                    placeholder="How much do you want to charge for your service per hr?"
                  />
                </div>{' '}
                <div className={style.currencyContainer}>
                  <label>Select preferred currency</label>
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
            )}
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
                ADD
              </button>
            </div>
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default AddService
