import Layout from '@/components/Layout'
import style from '@/styles/Proposals.module.css'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import { getClientServiceProposals } from '@/pages/api/get-service-proposals'
import Link from 'next/link'
import { getClientJobProposals } from '@/pages/api/get-job-proposals'
const Proposals = ({sentProposals,receivedProposals,authenticated}) => {
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
                {isSent && <div className={style.proposalsContainer}>
                    {sentProposals.map(proposal=>{return(
                        <div className={style.proposals} key={proposal._id}>
                      <Link href={`/services/service/${proposal.serviceID}`}><p>View Service</p></Link>
                      <h3>Freelancer</h3>
                      <p>{proposal.freelancer}</p>
                      <h3>Status</h3>
                      <p className={proposal.status ==='pending' ? style.yellow :style.green}>{proposal.status}</p>
                      <h3>Date Sent</h3>
                      <p>{proposal.createdAt}</p>
                      <h3>Proposal Message</h3>
                      <p>{proposal.proposal}</p>
                        </div>
                    )})}
                    </div>}
                    {isReceived && <div className={style.proposalsContainer}>
                    {sentProposals.map(proposal=>{return(
                        <div className={style.proposals} key={proposal._id}>
                      <Link href={`/services/service/${proposal.serviceID}`}><p>View Service</p></Link>
                      <h3>Freelancer</h3>
                      <p>{proposal.freelancer}</p>
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
    let authenticated  = true
    let sentProposals =[]
    let receivedProposals =[]
    if((await (session))?.user.email.length){
        sentProposals = await getClientServiceProposals((await session).user.email)
        receivedProposals = await getClientJobProposals((await session).user.email)
    }
    if(!receivedProposals.length && !sentProposals.length){
        authenticated= false
      }
    return {
      props: {
        sentProposals: JSON.parse(JSON.stringify(sentProposals)),
        receivedProposals: JSON.parse(JSON.stringify(receivedProposals)),
        authenticated
      },
    }
  }
  