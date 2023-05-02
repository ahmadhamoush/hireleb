import Layout from '@/components/Layout'
import style from '@/styles/Proposals.module.css'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import {  getFreelancerServiceProposals } from '@/pages/api/get-service-proposals'
import Link from 'next/link'
import { getFreelancerJobProposals } from '@/pages/api/get-job-proposals'
const Proposals = ({receivedProposals,sentProposals,authenticated}) => {
    const [isSent,setIsSent] = useState(true)
    const [isReceived, setIsReceived] = useState(false)
    
  return (
    <Layout>
        {authenticated ? <div className={style.container}>
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
               
                {isReceived && <div className={style.proposalsContainer}>
                    {receivedProposals.map(proposal=>{return(
                        <div className={style.proposals} key={proposal._id}>
                      <Link href={`/freelancer/service/${proposal.serviceID}`}><p>View Service</p></Link>
                      <h3>Client</h3>
                      <p>{proposal.client}</p>
                      <h3>Status</h3>
                      <p className={proposal.status ==='pending' ? style.yellow :style.green}>{proposal.status}</p>
                      <h3>Date Sent</h3>
                      <p>{proposal.createdAt}</p>
                      <h3>Proposal Message</h3>
                      <p>{proposal.proposal}</p>
                        </div>
                    )})}
                    </div>}
                    {isSent && <div className={style.proposalsContainer}>
                    {sentProposals.map(proposal=>{return(
                        <div className={style.proposals} key={proposal._id}>
                      <Link href={`/jobs/job/${proposal.jobID}`}><p>View Job</p></Link>
                      <h3>Client</h3>
                      <p>{proposal.client}</p>
                      <h3>Status</h3>
                      <p className={proposal.status ==='pending' ? style.yellow :style.green}>{proposal.status}</p>
                      <h3>Date Sent</h3>
                      <p>{proposal.createdAt}</p>
                      <h3>Proposal Message</h3>
                      <p>{proposal.proposal}</p>
                        </div>
                    )})}
                    </div>}
            

        </div>:<p>Not Authorized</p>}
    </Layout>
  )
}

export default Proposals

export async function getServerSideProps(context) {
    const session = getSession(context)
    await initMongoose()
    let authenticated = true
    let receivedProposals =[]
    let sentProposals = []
    if((await (session))?.user.email.length){
      receivedProposals = await getFreelancerServiceProposals((await session).user.email)
      sentProposals = await getFreelancerJobProposals((await session)?.user.email)
    }
    if(!receivedProposals.length && !sentProposals.length){
      authenticated= false
    }

    return {
      props: {
        receivedProposals: JSON.parse(JSON.stringify(receivedProposals)),
        sentProposals: JSON.parse(JSON.stringify(sentProposals)),
        authenticated
      },
    }
  }
  