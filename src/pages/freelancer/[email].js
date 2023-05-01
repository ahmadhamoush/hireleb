import Layout from '@/components/Layout'
import style from '@/styles/User.module.css'
import { faAdd, faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { getUser } from '../api/get-user'
import { initMongoose } from '../../../lib/initMongoose'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getProjects } from '../api/get-projects'
import { getServices } from '../api/get-services'
import Service from '@/components/Service'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Animate } from 'react-simple-animate'
import { toast } from 'react-toastify'

const Freelancer = ({ user, projects, services }) => {
  const [isPortfolio, setIsPortfolio] = useState(true)
  const [isServices, setIsServices] = useState(false)
  const [profileClicked, setProfileClicked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(
    user.freelancer?.banner ? user.freelancer.banner : '',
  )
  const [selectedFile, setSelectedFile] = useState('')
  const [loggedIn, setIsloggedin] = useState(false)
  const router = useRouter()
  const session = useSession()
  useEffect(() => {
    if (profileClicked) {
      document.querySelector('body').style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.querySelector('body').style.overflowX = 'hidden'
      document.querySelector('body').style.overflowY = 'scroll'
    }
  }, [profileClicked])

  useEffect(() => {
    const updateBanner = async () => {
      try {
        const formData = new FormData()
        formData.append('email', session.data.user.email)
        formData.append('img', selectedFile)
        const { data } = await axios.post('/api/update-banner', formData)
        if (data) {
          toast('Banner Updated')
        }
      } catch (err) {
        console.log(err)
      }
    }
    if (selectedFile) {
      updateBanner()
    }
  }, [selectedFile])

  useEffect(() => {
    setIsloggedin(
      session.status === 'authenticated' &&
        session.data.user.email === user.email,
    )
  }, [session])
  return (
    <Layout>
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        {loggedIn ? (
          <div className={style.container}>
            {profileClicked && (
              <div className={style.profileClickedContainer}>
                <Image
                  className={style.profileClicked}
                  src={user.image}
                  width={300}
                  height={300}
                />
                <FontAwesomeIcon
                  onClick={() => setProfileClicked(false)}
                  className={style.close}
                  icon={faClose}
                />
              </div>
            )}
            <div className={style.banner}>
              <h1>Banner</h1>
              <div className={style.imgContainer}>
                <label>
                  <input
                    type="file"
                    hidden
                    onChange={async ({ target }) => {
                      //types of images allowed
                      const types = [
                        'image/jpeg',
                        'image/jpg',
                        'image/png',
                        'image/webp',
                      ]
                      //accessing files
                      if (target.files) {
                        // getting first file
                        const file = target.files[0]
                        //checking if type of image is valid
                        if (types.includes(file.type)) {
                          //creating a new url image to display selected image on frontend
                          setSelectedImage(window.URL.createObjectURL(file))
                          setSelectedFile(file)
                        } else {
                          toast('File Type Not Accepted')
                        }
                      }
                    }}
                  />
                  <div>
                    {/* displaying selected image */}
                    {selectedImage ? (
                      <Image
                        className={style.display}
                        src={selectedImage}
                        alt="profile picture"
                        fill
                        sizes="100vw"
                      />
                    ) : (
                      <FontAwesomeIcon className={style.add} icon={faAdd} />
                    )}
                  </div>
                </label>
              </div>
            </div>
            <div className={style.wrapper}>
              <div className={style.detailsWrapper}>
                <div className={style.details}>
                  <div className={style.profile}>
                    {user.image ? (
                      <Image
                        onClick={() => setProfileClicked(true)}
                        className={style.profile}
                        src={user.image}
                        width={80}
                        height={80}
                      />
                    ) : (
                      <FontAwesomeIcon className={style.user} icon={faUser} />
                    )}
                  </div>
                  <div className={style.desc}>
                    <p>
                      {user.fName} {user.lName}
                    </p>
                    <p>{user.type}</p>
                    <p>{user.freelancer.title}</p>
                    <p>{user.freelancer.about}</p>
                  </div>
                  <div className={style.hourlyrate}>
                    <p>{user.freelancer.hourlyrate}</p>
                    <p>
                      {user.freelancer.currency === 'USD' ? '$' : 'LL'}{' '}
                      <span>/hr</span>{' '}
                    </p>
                  </div>
                </div>
                <div className={style.btns}>
                  <button
                    onClick={() => router.push('/freelancer/add-project')}
                  >
                    Add New Project
                  </button>
                  <button
                    onClick={() => router.push('/freelancer/add-service')}
                  >
                    Add a Service
                  </button>
                  <button>Build CV</button>
                  <button>Build Porfolio</button>
                  <button>Change Account Type</button>
                </div>
              </div>
              <div className={style.showcase}>
                <div className={style.options}>
                  <input
                    checked={isPortfolio}
                    onChange={(e) => {
                      setIsPortfolio(true)
                      setIsServices(false)
                    }}
                    id={style.portfolioLabel}
                    hidden
                    type="checkbox"
                  />
                  <label
                    htmlFor={style.portfolioLabel}
                    className={isPortfolio && style.selected}
                  >
                    Portfolio ({projects.length})
                  </label>
                  <input
                    checked={isServices}
                    onChange={() => {
                      setIsPortfolio(false)
                      setIsServices(true)
                    }}
                    id={style.servicesLabel}
                    hidden
                    type="checkbox"
                  />
                  <label
                    htmlFor={style.servicesLabel}
                    onClick={() => {
                      setIsPortfolio(false)
                      setIsServices(true)
                    }}
                    className={isServices && style.selected}
                  >
                    Services ({services.length})
                  </label>
                </div>
                {isPortfolio && (
                  <div className={style.portfolio}>
                    {!projects.length && <h4>No Projects</h4>}
                    {projects.map((project) => {
                      return (
                        <Image
                          key={project._id}
                          src={project.image}
                          width={180}
                          height={100}
                          alt={project.name}
                          className={style.project}
                          onClick={() => {
                            router.push(`/freelancer/project/${project._id}`)
                          }}
                        />
                      )
                    })}
                  </div>
                )}
                {isServices && (
                  <div className={style.services}>
                    {!services.length && <h4>No Services</h4>}
                    {services.map((service) => {
                      return (
                        <div
                          onClick={() => {
                            router.push(`/freelancer/service/${service._id}`)
                          }}
                        >
                          <Service
                            title={user.freelancer.title}
                            service={service}
                          />
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <div className={style.creditsWrapper}>
                <div>
                  <p>Credits</p>
                  <h2>30</h2>
                  <button
                    onClick={() => router.push('/deposit')}
                    className={style.creditsbtn}
                  >
                    Deposit
                  </button>
                </div>
                <div>
                  <p className={style.transactionHeader}>Transactions</p>
                  <div className={style.transactions}>
                    <p>
                      <span>20 Credits</span> have been deposited
                    </p>
                    <p>
                      <span>12 Credits</span> have been transferred
                    </p>
                    <p>
                      <span>8 Credits</span> have been deposited
                    </p>
                    <p>
                      <span>22 Credits</span> Credits have been deposited
                    </p>
                    <p>
                      <span>5 Credits</span> Credits have been transferred
                    </p>
                  </div>
                  <button className={style.creditsbtn}>View All</button>
                </div>
                <div>
                  <p>Sent Proposals</p>
                  <h2>18</h2>
                  <p>Recieved Proposals</p>
                  <h2>7</h2>
                  <button className={style.creditsbtn}>View All</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className={style.err}>Not Authorized</p>
        )}
      </Animate>
    </Layout>
  )
}

export default Freelancer
export async function getServerSideProps(context) {
  const { query } = context
  const { email } = query
  await initMongoose()
  return {
    props: {
      user: JSON.parse(JSON.stringify(await getUser(email))),
      projects: JSON.parse(JSON.stringify(await getProjects(email))),
      services: JSON.parse(JSON.stringify(await getServices(email))),
    },
  }
}
