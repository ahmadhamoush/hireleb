import Layout from '@/components/Layout'
import style from '@/styles/User.module.css'
import { faAdd, faClose, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { getUser } from '../api/get-user'
import { initMongoose } from '../../../lib/initMongoose'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { Animate } from 'react-simple-animate'
import { toast } from 'react-toastify'
import { getUserJobs } from '../api/get-jobs'
import Job from '@/components/Job'
import { getClientServiceProposals } from '../api/get-service-proposals'
import { getClientJobProposals } from '../api/get-job-proposals'
import { getTransactions } from '../api/get-transactions'

const Client = ({
  user,
  jobs,
  sentProposals,
  receivedProposals,
  transactions,
}) => {
  const [profileClicked, setProfileClicked] = useState(false)
  const [selectedImage, setSelectedImage] = useState(
    user?.client?.banner ? user.client.banner : '',
  )
  const [selectedFile, setSelectedFile] = useState('')
  const [loggedIn, setIsloggedin] = useState(false)
  const [isAccountType, setIsAccountType] = useState(false)
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
        session.data.user.email === user?.email,
    )
  }, [session])
  useEffect(() => {
    setIsAccountType(router.asPath.includes(user?.type))
  }, [session])
  return (
    <Layout>
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        {loggedIn && isAccountType ? (
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
                <div className={style.leftWrapper}>
                  <div className={style.btns}>
                    <button onClick={() => router.push('/post-a-job')}>
                      Post a Job
                    </button>
                  </div>
                  <div className={style.proposals}>
                    <div>
                      <p>Sent Proposals</p>
                      <h2>{sentProposals?.length}</h2>
                      <p>Recieved Proposals</p>
                      <h2>{receivedProposals?.length}</h2>
                      <button
                        onClick={() => router.push('/client/proposals')}
                        className={style.creditsbtn}
                      >
                        View All
                      </button>
                    </div>
                    <div>
                      <p>On going jobs</p>
                      <h2>
                        {receivedProposals.filter(
                          (proposal) => proposal.status === 'accepted',
                        ).length +
                          sentProposals.filter(
                            (proposal) => proposal.status === 'accepted',
                          ).length}
                      </h2>
                      <button
                        onClick={() => router.push('/client/on-going')}
                        className={style.creditsbtn}
                      >
                        View All
                      </button>
                    </div>
                  </div>
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
              <div className={style.creditsWrapper}>
                <div>
                  <p>Credits</p>
                  <h2>{user.credits}</h2>
                  <button
                    onClick={() => router.push('/deposit')}
                    className={style.creditsbtn}
                  >
                    Deposit
                  </button>
                  <button
                    onClick={() => router.push('/withdraw')}
                    className={style.creditsbtn}
                  >
                    Withdraw
                  </button>
                </div>
                <div>
                  <p className={style.transactionHeader}>Transactions</p>
                  <div className={style.transactions}>
                    {transactions?.deposits
                      .slice(0, 3)
                      .map((deposit, index) => {
                        return (
                          <p key={index}>
                            <span>{deposit.credits} Credits</span> have been
                            deposited
                          </p>
                        )
                      })}
                    {transactions?.transfers
                      .slice(0, 3)
                      .map((transfer, index) => {
                        return (
                          <p key={index}>
                            <span>{transfer.credits} Credits</span> have been
                            transfered
                          </p>
                        )
                      })}
                    {transactions?.received
                      .slice(0, 3)
                      .map((receive, index) => {
                        return (
                          <p key={index}>
                            <span>{receive.credits} Credits</span> have been
                            received
                          </p>
                        )
                      })}
                  </div>
                  <button
                    onClick={() => router.push('/client/transactions')}
                    className={style.creditsbtn}
                  >
                    View All
                  </button>
                </div>
                <div>
                  <p>Rate Completed Jobs</p>
                  <h2>
                    {sentProposals.filter(
                      (proposal) => proposal.status === 'completed',
                    ).length +
                      receivedProposals.filter(
                        (proposal) => proposal.status === 'completed',
                      ).length}
                  </h2>
                  <button
                    onClick={() => router.push('/client/rate-freelancers')}
                    className={style.creditsbtn}
                  >
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className={style.err}>Not Authorized</p>
        )}
        {loggedIn && !isAccountType && (
          <p className={style.err}>
            Change account type to access{' '}
            {user.type === 'client' ? 'client' : 'client'} account
          </p>
        )}
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
      sentProposals: JSON.parse(
        JSON.stringify(await getClientServiceProposals(email)),
      ),
      receivedProposals: JSON.parse(
        JSON.stringify(await getClientJobProposals(email)),
      ),
      transactions: JSON.parse(JSON.stringify(await getTransactions(email))),
    },
  }
}
