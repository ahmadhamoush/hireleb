import Layout from '@/components/Layout'
import style from '@/styles/User.module.css'
import { faAdd, faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Service from '@/components/Service'
import { getSession } from 'next-auth/react'
import { Animate } from 'react-simple-animate'
import { getUser } from '@/pages/api/get-user'
import { getProjects } from '@/pages/api/get-projects'
import { getServices } from '@/pages/api/get-services'
import { initMongoose } from '../../../../lib/initMongoose'

const Freelancer = ({
  user,
  projects,
  services,
  receivedProposals,
  sentProposals,
  transactions,
}) => {
  const [isPortfolio, setIsPortfolio] = useState(false)
  const [isServices, setIsServices] = useState(true)
  const [profileClicked, setProfileClicked] = useState(false)

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
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          {profileClicked && (
            <div className={style.profileClickedContainer}>
              <Image
                className={style.profileClicked}
                src={user?.image}
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
              <div>
                <Image
                  className={style.display}
                  src={user?.freelancer.banner}
                  alt="banner"
                  fill
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
          <div className={style.wrapper}>
            <div className={style.detailsWrapper}>
              <div className={style.details}>
                <div className={style.profile}>
                  {user?.image ? (
                    <Image
                      onClick={() => setProfileClicked(true)}
                      className={style.profile}
                      src={user?.image}
                      width={80}
                      height={80}
                    />
                  ) : (
                    <FontAwesomeIcon className={style.user} icon={faUser} />
                  )}
                </div>
                <div className={style.desc}>
                  <p>
                    {user?.fName} {user?.lName}
                  </p>
                  <p>{user?.type}</p>
                  <p>{user?.freelancer.title}</p>
                  <p>{user?.freelancer.about}</p>
                </div>
                <div className={style.hourlyrate}>
                  <p style={{ marginRight: '3px' }}>
                    {user?.freelancer.hourlyrate}
                  </p>
                  <p>
                    Credits
                    <span>/hr</span>{' '}
                  </p>
                </div>
              </div>
              <div className={style.rates}>
             {user?.rates.map(rate=>{
                return(
                <>
                    <div className={style.rate}>
                    <h3>Quality of work</h3>
                    <div className={style.progressBar}>
                      <div
                        style={{ '--i': '30%' }}
                        className={style.progress}
                      ></div>
                    </div>
                  </div>
                  <div className={style.rate}>
                    <h3>Adherence to deadlines</h3>
                    <div className={style.progressBar}>
                      <div
                        style={{ '--i': '50%' }}
                        className={style.progress}
                      ></div>
                    </div>
                  </div>
                  <div className={style.rate}>
                    <h3>Responsiveness</h3>
                    <div className={style.progressBar}>
                      <div
                        style={{ '--i': '60%' }}
                        className={style.progress}
                      ></div>
                    </div>
                  </div>
                  <div className={style.rate}>
                    <h3>Communication skills</h3>
                    <div className={style.progressBar}>
                      <div
                        style={{ '--i': '60%' }}
                        className={style.progress}
                      ></div>
                    </div>
                  </div>
                  <div className={style.rate}>
                    <h3>Satisfaction with outcome</h3>
                    <div className={style.progressBar}>
                      <div
                        style={{ '--i': '60%' }}
                        className={style.progress}
                      ></div>
                    </div>
                  </div></>
                )
             })}
            </div>
            </div>
            <div className={style.showcase}>
              <div className={style.options}>
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
                        key={service._id}
                        onClick={() => {
                          router.push(`/freelancer/service/${service._id}`)
                        }}
                      >
                        <Service service={service} currentUser={true} />
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
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