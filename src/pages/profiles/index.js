import Layout from '@/components/Layout'
import style from '@/styles/Services.module.css'
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jobCategories from '../../../lib/jobCategories'
import { useEffect, useState } from 'react'
import Profile from '@/components/Profile'
import { initMongoose } from '../../../lib/initMongoose'
import { getUsers } from '../api/get-user'

const Users = ({ users }) => {
  const [categoriesList, setCategoriesList] = useState([])
  const [category, setCategory] = useState('')
  const [subcategory, setSubCategory] = useState('')
  const [skills, setSkills] = useState([])
  const [fixed, setFixed] = useState(false)
  const [hourly, setHourly] = useState(false)
  const [remote, setRemote] = useState(false)
  const [onsite, setOnsite] = useState(false)
  const [payment, setPayment] = useState('')
  const [delivery, setDelivery] = useState('')
  const [search, setSearch] = useState('')
  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  return (
    <Layout>
      <div className={style.container}>
        <div className={style.banner}>
          <h1>
            Explore Top-notch Freelance users & Offers with Hire
            <span>Leb</span>.
          </h1>
          <p>
            Find the users you need - Search and discover top-rated freelancers
            and their users
          </p>
          <div className={style.search}>
            <input
              type="text"
              placeholder="Search for users"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
          </div>
        </div>
        <div className={style.wrapper}>
          <div className={style.filterContainer}>
            <div>
              <label htmlFor={style.category}>Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                  setSearch('')
                }}
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
              <label htmlFor={style.subcategory}>Subcategory</label>
              <select
                value={subcategory}
                onChange={(e) => {
                  setSubCategory(e.target.value)
                  setSearch('')
                }}
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
              {subcategory.length > 0 && (
                <>
                  {' '}
                  <label htmlFor={style.skills}>user Skills*</label>
                  <select
                    multiple={true}
                    onChange={(e) => {
                      setSkills((prev) => [
                        ...new Set(prev).add(e.target.value),
                      ])
                      setSearch('')
                    }}
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
                </>
              )}
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
            <div className={style.radio}>
              <form>
                <label>user Payment</label>
                <label>
                  <input
                    type="radio"
                    onChange={() => {
                      setFixed(true)
                      setHourly(false)
                      setPayment('fixed')
                      setSearch('')
                    }}
                    name="radio"
                    checked={fixed}
                  />
                  <span>fixed</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    onChange={() => {
                      setFixed(false)
                      setHourly(true)
                      setPayment('hourly')
                      setSearch('')
                    }}
                    checked={hourly}
                  />
                  <span>hourly</span>
                </label>
              </form>
            </div>
            <div className={style.radio}>
              <form>
                <label>user Delivery</label>
                <label>
                  <input
                    type="radio"
                    onChange={() => {
                      setRemote(true)
                      setOnsite(false)
                      setDelivery('remote')
                      setSearch('')
                    }}
                    name="radio"
                    checked={remote}
                  />
                  <span>remote</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radio"
                    onChange={() => {
                      setOnsite(true)
                      setRemote(false)
                      setDelivery('onsite')
                      setSearch('')
                    }}
                    checked={onsite}
                  />
                  <span>onsite</span>
                </label>
              </form>
            </div>
          </div>
          {!search.length &&
            category.length > 0 &&
            !subcategory.length &&
            !skills.length &&
            !payment.length &&
            !delivery.length && (
              <div className={style.display}>
                {users
                  .filter((user) => user.category === category)
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            subcategory.length > 0 &&
            !skills.length &&
            !payment.length &&
            !delivery.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.category === category &&
                      user.subcategory === subcategory,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            skills.length > 0 &&
            !payment.length &&
            !delivery.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.category === category &&
                      user.subcategory === subcategory &&
                      skills.some((skill) =>
                        user.skills.split(',').includes(skill),
                      ),
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}

          {!search.length &&
            payment.length > 0 &&
            delivery.length > 0 &&
            !category.length &&
            !subcategory.length &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.payment === payment && user.delivery === delivery,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            payment.length > 0 &&
            !delivery.length &&
            !category.length &&
            !subcategory.length &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter((user) => user.payment === payment)
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            delivery.length > 0 &&
            !payment.length &&
            !category.length &&
            !subcategory.length &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter((user) => user.delivery === delivery)
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}

          {!search.length &&
            payment.length > 0 &&
            delivery.length > 0 &&
            category.length > 0 &&
            subcategory.length > 0 &&
            skills.length > 0 && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.payment === payment &&
                      user.delivery === delivery &&
                      user.category === category &&
                      user.subcategory === subcategory &&
                      skills.some((skill) =>
                        user.skills.split(',').includes(skill),
                      ),
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            payment.length > 0 &&
            !delivery.length &&
            category.length > 0 &&
            subcategory.length > 0 &&
            skills.length > 0 && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.payment === payment &&
                      user.category === category &&
                      user.subcategory === subcategory &&
                      skills.some((skill) =>
                        user.skills.split(',').includes(skill),
                      ),
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            delivery.length > 0 &&
            !payment.length &&
            category.length > 0 &&
            subcategory.length > 0 &&
            skills.length > 0 && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.delivery === delivery &&
                      user.category === category &&
                      user.subcategory === subcategory &&
                      skills.some((skill) =>
                        user.skills.split(',').includes(skill),
                      ),
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}

          {!search.length &&
            payment.length > 0 &&
            delivery.length > 0 &&
            category.length > 0 &&
            subcategory.length > 0 &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.payment === payment &&
                      user.delivery === delivery &&
                      user.category === category &&
                      user.subcategory === subcategory,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            payment.length > 0 &&
            !delivery.length &&
            category.length > 0 &&
            subcategory.length > 0 &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.payment === payment &&
                      user.category === category &&
                      user.subcategory === subcategory,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            delivery.length > 0 &&
            !payment.length &&
            category.length > 0 &&
            subcategory.length > 0 &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.delivery === delivery &&
                      user.category === category &&
                      user.subcategory === subcategory,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}

          {!search.length &&
            payment.length > 0 &&
            delivery.length > 0 &&
            category.length > 0 &&
            !subcategory.length &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.payment === payment &&
                      user.delivery === delivery &&
                      user.category === category,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            payment.length > 0 &&
            !delivery.length &&
            category.length > 0 &&
            !subcategory.length &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.payment === payment && user.category === category,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}
          {!search.length &&
            delivery.length > 0 &&
            !payment.length &&
            category.length > 0 &&
            !subcategory.length &&
            !skills.length && (
              <div className={style.display}>
                {users
                  .filter(
                    (user) =>
                      user.delivery === delivery && user.category === category,
                  )
                  .map((user) => {
                    return (
                      <Profile key={user._id} currentUser={false} user={user} />
                    )
                  })}
              </div>
            )}

          {!search.length &&
            !category.length &&
            !payment.length &&
            !delivery.length && (
              <div className={style.display}>
                {users.map((user) => {
                  return (
                    <Profile key={user._id} currentUser={false} user={user} />
                  )
                })}
              </div>
            )}
          {search.length > 0 && (
            <div className={style.display}>
              {users
                .filter(
                  (user) =>
                    user.fName.toLowerCase().includes(search) ||
                    user.lName.toLowerCase().includes(search),
                )
                .map((user) => {
                  return (
                    <Profile key={user._id} currentUser={false} user={user} />
                  )
                })}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Users
export async function getServerSideProps() {
  await initMongoose()
  return {
    props: {
      users: JSON.parse(JSON.stringify(await getUsers())),
    },
  }
}
