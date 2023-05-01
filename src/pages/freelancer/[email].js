import Layout from '@/components/Layout'
import style from '@/styles/Freelancer.module.css'
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

const Freelancer = ({ user, projects, services }) => {
  const [isPortfolio, setIsPortfolio] = useState(true)
  const [isServices, setIsServices] = useState(false)
  const [profileClicked, setProfileClicked] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (profileClicked) {
      document.querySelector('body').style.overflow = 'hidden'
      window.scrollTo(0, 0)
    } else {
      document.querySelector('body').style.overflowX = 'hidden'
      document.querySelector('body').style.overflowY = 'scroll'
    }
  }, [profileClicked])
  return (
    <Layout>
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
          <FontAwesomeIcon className={style.add} icon={faAdd} />
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
              <button onClick={() => router.push('/freelancer/add-project')}>
                Add New Project
              </button>
              <button onClick={() => router.push('/freelancer/add-service')}>
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
                Services (23)
              </label>
            </div>
            {isPortfolio && (
              <div className={style.portfolio}>
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
                {services.map((service) => {
                  return (
                    <div onClick={() => {
                      router.push(`/freelancer/service/${service._id}`)
                    }}>
                      <Service owner={user.freelancer.title} service={service} />
                    </div>   
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
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
