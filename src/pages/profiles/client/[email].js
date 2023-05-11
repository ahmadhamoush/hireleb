import Layout from '@/components/Layout'
import style from '@/styles/User.module.css'
import { faAdd, faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Animate } from 'react-simple-animate'
import Job from '@/components/Job'
import { getUserJobs } from '@/pages/api/get-jobs'
import { getUser } from '@/pages/api/get-user'
import { initMongoose } from '../../../../lib/initMongoose'

const Client = ({ user, jobs }) => {
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
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          {profileClicked && (
            <div className={style.profileClickedContainer}>
              <Image
                alt="profile"
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
              <div>
                <Image
                  className={style.display}
                  src={user?.client.banner}
                  alt="profile picture"
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
                  {user.image ? (
                    <Image
                      onClick={() => setProfileClicked(true)}
                      className={style.profile}
                      src={user.image}
                      width={80}
                      height={80}
                      alt="profile"
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
                  <p>{user.client.title}</p>
                  <p>{user.client.about}</p>
                </div>
                <div className={style.hourlyrate}>
                  <p style={{ marginRight: '3px' }}>
                    {user?.client.hourlyrate}
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
                  checked={true}
                  id={style.portfolioLabel}
                  hidden
                  type="checkbox"
                />
                <label
                  htmlFor={style.portfolioLabel}
                  className={style.selected}
                >
                  Jobs ({jobs.length})
                </label>
              </div>

              <div className={style.services}>
                {jobs.map((job) => {
                  return (
                    <div
                      key={job._id}
                      onClick={() => router.push(`/client/job/${job._id}`)}
                    >
                      <Job job={job} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default Client
export async function getServerSideProps(context) {
  const { query } = context
  const { email } = query
  await initMongoose()
  return {
    props: {
      user: JSON.parse(JSON.stringify(await getUser(email))),
      jobs: JSON.parse(JSON.stringify(await getUserJobs(email))),
    },
  }
}
