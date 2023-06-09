import Layout from '@/components/Layout'
import style from '@/styles/Proposals.module.css'
import { getSession, useSession } from 'next-auth/react'
import { useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import { getClientServiceProposals } from '@/pages/api/get-service-proposals'
import Link from 'next/link'
import { getClientJobProposals } from '@/pages/api/get-job-proposals'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'
const Proposals = ({ sentProposals, receivedProposals, authenticated }) => {
  const [isSent, setIsSent] = useState(true)
  const [isReceived, setIsReceived] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const session = useSession()
  const accept = async (id) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('status', 'accepted')
      formData.append('sender', session.data.user.email)
      const { data } = await axios.post('/api/update-job-proposal', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Proposal Updated')
        router.push(`/client/${session.data.user.email}`)
      }
    } catch (err) {
      console.log(err)
      setLoading(false)
    }
  }
  const decline = async (id) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('status', 'declined')
      const { data } = await axios.post('/api/update-job-proposal', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Proposal Updated')
        router.push(`/client/${session.data.user.email}`)
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
              Sent ({sentProposals.length})
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
              Recieved ({receivedProposals.length})
            </label>
          </div>
          {isSent && (
            <div className={style.proposalsContainer}>
              {sentProposals.map((proposal) => {
                return (
                  <div className={style.proposals} key={proposal._id}>
                    <Link href={`/services/service/${proposal.service[0]._id}`}>
                      <p>View Service</p>
                    </Link>
                    <h3>Freelancer</h3>
                    <p>{proposal.freelancer}</p>
                    <h3>Status</h3>
                    <p
                      className={
                        proposal.status === 'pending'
                          ? style.yellow
                          : style.green
                      }
                    >
                      {proposal.status}
                    </p>
                    <h3>Date Sent</h3>
                    <p>{proposal.createdAt}</p>
                    <h3>Proposal Message</h3>
                    <p>{proposal.proposal}</p>
                  </div>
                )
              })}
            </div>
          )}
          {isReceived && (
            <div className={style.proposalsContainer}>
              {receivedProposals.map((proposal) => {
                return (
                  <div className={style.proposals} key={proposal._id}>
                    <Link href={`/jobs/job/${proposal.job._id}`}>
                      <p>View Service</p>
                    </Link>
                    <h3>Freelancer</h3>
                    <p>{proposal.freelancer}</p>
                    <h3>Status</h3>
                    {proposal.status === 'pending' && (
                      <p className={style.yellow}>{proposal.status}</p>
                    )}
                    {proposal.status === 'accepted' && (
                      <p className={style.green}>{proposal.status}</p>
                    )}
                    {proposal.status === 'completed' && (
                      <p className={style.green}>{proposal.status}</p>
                    )}
                    {proposal.status === 'declined' && (
                      <p className={style.red}>{proposal.status}</p>
                    )}
                    <h3>Date Sent</h3>
                    <p>{proposal.createdAt}</p>
                    <h3>Proposal Message</h3>
                    <p>{proposal.proposal}</p>
                    {proposal.status === 'pending' && (
                      <div className={style.btns}>
                        <button
                          onClick={() => decline(proposal._id)}
                          type="button"
                        >
                          DECLINE
                        </button>
                        <button
                          onClick={() => accept(proposal._id)}
                          type="button"
                        >
                          ACCEPT
                        </button>
                      </div>
                    )}
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
  let authenticated = true
  let sentProposals = []
  let receivedProposals = []
  if ((await session)?.user.email.length) {
    sentProposals = await getClientServiceProposals((await session).user.email)
    receivedProposals = await getClientJobProposals((await session).user.email)
  }

  return {
    props: {
      sentProposals: JSON.parse(JSON.stringify(sentProposals)),
      receivedProposals: JSON.parse(JSON.stringify(receivedProposals)),
    },
  }
}
