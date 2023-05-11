import Layout from '@/components/Layout'
import style from '@/styles/Ongoing.module.css'
import { getSession, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import { getFreelancerServiceProposals } from '@/pages/api/get-service-proposals'
import Link from 'next/link'
import { getFreelancerJobProposals } from '@/pages/api/get-job-proposals'
import Loader from '@/components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'

const Proposals = ({ receivedProposals, sentProposals, authenticated }) => {
  const [isSent, setIsSent] = useState(true)
  const [isReceived, setIsReceived] = useState(false)
  const [loading, setLoading] = useState(false)
  const [updateValue, setUpdate] = useState('')
  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    if (document.querySelector(`.${style.updates}`)) {
      document.querySelectorAll(`.${style.updates}`).forEach((element) => {
        element.scrollTop = element.scrollHeight
      })
    }
  }, [isReceived, isSent])
  const updateService = async (id) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('message', updateValue)
      formData.append('sender', session.data.user.email)
      const { data } = await axios.post('/api/update-ongoing-service', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Update Sent')
        const refreshData = () => router.replace(router.asPath)
        refreshData()
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  const updateJob = async (id) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('message', updateValue)
      formData.append('sender', session.data.user.email)
      const { data } = await axios.post('/api/update-ongoing-job', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Update Sent')
        const refreshData = () => router.replace(router.asPath)
        refreshData()
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const markAsComplete = async (id) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('sender', session.data.user.email)
      const { data } = await axios.post('/api/complete-service', formData)
      console.log(data)
      if (data.foundProposal.paid) {
        setLoading(false)
        toast('Service Completed!')
        const refreshData = () => router.replace(router.asPath)
        refreshData()
      } else {
        setLoading(false)
        toast('Cannot mark as complete since service is not paid')
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const markJobAsComplete = async (id) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('sender', session.data.user.email)
      const { data } = await axios.post('/api/complete-job', formData)
      console.log(data)
      if (data.foundProposal.paid) {
        setLoading(false)
        toast('Job Completed!')
        const refreshData = () => router.replace(router.asPath)
        refreshData()
      } else {
        setLoading(false)
        toast('Cannot mark as complete since job is not paid')
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }

  return (
    <Layout>
      {loading && <Loader />}
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          <h2>On going</h2>
          <div className={style.header}>
            <input
              checked={isSent}
              onChange={(e) => {
                setIsSent(true)
                setIsReceived(false)
              }}
              id={style.label1}
              hidden
              type="checkbox"
            />
            <label htmlFor={style.label1} className={isSent && style.selected}>
              Sent (
              {
                sentProposals.filter(
                  (proposal) => proposal.status === 'accepted',
                ).length
              }
              )
            </label>
            <input
              checked={isReceived}
              onChange={() => {
                setIsSent(false)
                setIsReceived(true)
              }}
              id={style.label}
              hidden
              type="checkbox"
            />
            <label
              htmlFor={style.label}
              onClick={() => {
                setIsSent(false)
                setIsReceived(true)
              }}
              className={isReceived && style.selected}
            >
              Recieved (
              {
                receivedProposals.filter(
                  (proposal) => proposal.status === 'accepted',
                ).length
              }
              )
            </label>
          </div>

          {isReceived && (
            <div className={style.proposalsContainer}>
              {receivedProposals.map((proposal) => {
                return (
                  <div key={proposal._id} className={style.proposalFlex}>
                    <div className={style.proposals} key={proposal._id}>
                      <Link
                        href={`/freelancer/service/${proposal.service[0]._id}`}
                      >
                        <p>View Service</p>
                      </Link>
                      <h3>Client</h3>
                      <p>{proposal.client}</p>
                      <h3>Service</h3>
                      <p>{proposal.service[0].name}</p>
                      <h3>Description</h3>
                      <p>{proposal.service[0].desc}</p>
                      {proposal.status === 'accepted' && (
                        <h3 style={{ color: '#feff5c' }}>In Progress...</h3>
                      )}
                      {proposal.status === 'completed' && (
                        <h3 style={{ color: '#feff5c' }}>Service Completed!</h3>
                      )}
                      <h3>Paid</h3>
                      <p>{proposal.paid ? 'yes' : 'no'}</p>
                    </div>
                    <div className={style.updatesContainer}>
                      <div className={style.updatesHeader}>
                        <h3>Updates</h3>
                        <ul>
                          <li onClick={() => markAsComplete(proposal._id)}>
                            Mark as complete
                          </li>
                          <li>Send project file</li>
                        </ul>
                      </div>

                      <div className={style.updates}>
                        {proposal.updates.map((update, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                update.sender === proposal.client
                                  ? style.updateSender
                                  : style.updateReceiver
                              }
                            >
                              <p className={style.msg}>{update.message}</p>
                              <div className={style.from}>
                                {' '}
                                <p>from {update.sender}</p>
                                <p>{update.date}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className={style.sendContainer}>
                        <input
                          value={updateValue}
                          onChange={(e) => setUpdate(e.target.value)}
                          placeholder="Send an Update!"
                        />
                        <button
                          disabled={!updateValue.length && true}
                          onClick={() => updateService(proposal._id)}
                          className={style.send}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {isSent && (
            <div className={style.proposalsContainer}>
              {sentProposals.map((proposal) => {
                return (
                  <div key={proposal._id} className={style.proposalFlex}>
                    <div className={style.proposals} key={proposal._id}>
                      <Link href={`/jobs/job/${proposal.job._id}`}>
                        <p>View Job</p>
                      </Link>
                      <h3>Client</h3>
                      <p>{proposal.client}</p>
                      <h3>Job</h3>
                      <p>{proposal.job.title}</p>
                      <h3>Description</h3>
                      <p>{proposal.job.description}</p>
                      <h3 style={{ color: '#feff5c' }}>In Progress...</h3>
                      <h3>Paid</h3>
                      <p>{proposal.paid ? 'yes' : 'no'}</p>
                    </div>
                    <div className={style.updatesContainer}>
                      <div className={style.updatesHeader}>
                        <h3>Updates</h3>
                        <ul>
                          <li onClick={() => markJobAsComplete(proposal._id)}>
                            Mark as complete
                          </li>
                          <li>Send project file</li>
                        </ul>
                      </div>
                      <div className={style.updates}>
                        {proposal.updates.map((update, index) => {
                          return (
                            <div
                              key={index}
                              className={
                                update.sender === proposal.client
                                  ? style.updateSender
                                  : style.updateReceiver
                              }
                            >
                              <p className={style.msg}>{update.message}</p>
                              <div className={style.from}>
                                {' '}
                                <p>from {update.sender}</p>
                                <p>{update.date}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                      <div className={style.sendContainer}>
                        <input
                          value={updateValue}
                          onChange={(e) => setUpdate(e.target.value)}
                          placeholder="Send an Update!"
                        />
                        <button
                          disabled={!updateValue.length && true}
                          onClick={() => updateJob(proposal._id)}
                          className={style.send}
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Animate>
    </Layout>
  )
}

export default Proposals

export async function getServerSideProps(context) {
  const session = getSession(context)
  await initMongoose()

  let receivedProposals = []
  let sentProposals = []
  if ((await session)?.user.email.length) {
    receivedProposals = await getFreelancerServiceProposals(
      (
        await session
      ).user.email,
    )
    sentProposals = await getFreelancerJobProposals((await session)?.user.email)
  }

  sentProposals = sentProposals.filter(
    (proposal) => proposal.status === 'accepted',
  )
  receivedProposals = receivedProposals.filter(
    (proposal) => proposal.status === 'accepted',
  )

  return {
    props: {
      receivedProposals: JSON.parse(JSON.stringify(receivedProposals)),
      sentProposals: JSON.parse(JSON.stringify(sentProposals)),
    },
  }
}
