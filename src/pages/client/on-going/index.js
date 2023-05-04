import Layout from '@/components/Layout'
import style from '@/styles/Proposals.module.css'
import { getSession, useSession } from 'next-auth/react'
import { useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import { getClientServiceProposals } from '@/pages/api/get-service-proposals'
import Link from 'next/link'
import {  getClientJobProposals } from '@/pages/api/get-job-proposals'
import Loader from '@/components/Loader'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'

const Proposals = ({ receivedProposals, sentProposals, authenticated }) => {
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
      const { data } = await axios.post(
        '/api/update-service-proposal',
        formData,
      )
      if (data.done === 'ok') {
        setLoading(false)
        toast('Proposal Updated')
        router.push(`/freelancer/${session.data.user.email}`)
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
      const { data } = await axios.post(
        '/api/update-service-proposal',
        formData,
      )
      if (data.done === 'ok') {
        setLoading(false)
        toast('Proposal Updated')
        router.push(`/freelancer/${session.data.user.email}`)
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
              <label
                htmlFor={style.label1}
                className={isSent && style.selected}
              >
                Sent ({sentProposals.filter(proposal=>proposal.status==='accepted').length})
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
                Recieved ({receivedProposals.filter(proposal=>proposal.status==='accepted').length})
              </label>
            </div>

            {isReceived && (
              <div className={style.proposalsContainer}>
                {receivedProposals.map((proposal) => {
                  return (
                    <div className={style.proposals} key={proposal._id}>
                      <Link href={`/client/job/${proposal.job._id.toString()}`}>
                        <p>View Job</p>
                      </Link>
                      <h3>Freelancer</h3>
                      <p>{proposal.freelancer}</p> 
                      <h3>Job</h3>
                      <p>{proposal.job.title}</p>  
                      <h3>Description</h3>
                      <p>{proposal.job.description}</p>     
                      <button
                          style={{background:'#1E1E1E',color:'#fff',width:'100%'}}
                            type="button"
                            onClick={()=>router.push(`client/on-going/${proposal._id}`)}
                          >
                            Send Update
                          </button>             
                    </div>
                  )
                })}
              </div>
            )}
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
                      <h3>Service</h3>
                      <p>{proposal.service[0].name}</p>
                      <h3>Description</h3>
                      <p>{proposal.service[0].desc}</p>
                      <button
                          style={{background:'#1E1E1E',color:'#fff',width:'100%'}}
                            type="button"
                            onClick={()=>router.push(`client/on-going/${proposal._id}`)}
                          >
                            Send Update
                          </button>
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
    sentProposals = await getClientServiceProposals(
      (
        await session
      ).user.email,
    )
    receivedProposals = await getClientJobProposals((await session)?.user.email)
  }

  
  sentProposals = sentProposals.filter(proposal=>proposal.status ==='accepted')
  receivedProposals = receivedProposals.filter(proposal=>proposal.status ==='accepted')

  return {
    props: {
      receivedProposals: JSON.parse(JSON.stringify(receivedProposals)),
      sentProposals: JSON.parse(JSON.stringify(sentProposals)),
   
    },
  }
}
