import Layout from '@/components/Layout'
import style from '@/styles/Proposals.module.css'
import { getSession, useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { initMongoose } from '../../../../lib/initMongoose'
import { getClientServiceProposals } from '@/pages/api/get-service-proposals'
import Link from 'next/link'
const Proposals = ({sentProposals}) => {
    const [isSent,setIsSent] = useState(true)
    const [isReceived, setIsReceived] = useState(false)
    const session = useSession()
    const [loggedIn, setLoggedIn]=useState(false)
    
    useEffect(()=>{
        if(session.status==='authenticated'){
            setLoggedIn(true)
        }
    },[session])
  return (
    <Layout>
        {sentProposals.length ? <div className={style.container}>
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
                    Sent (1)
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
                    Recieved (1)
                  </label>
                </div>
                {isSent && <div className={style.sent}>
                    {sentProposals.map(proposal=>{return(
                        <div className={style.service} key={proposal._id}>
                      <Link href={`/services/service/${proposal.serviceID}`}><p>View Service</p></Link>
                      <h3>Service By</h3>
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
    let sentProposals =[]
    if((await (session))?.user.email.length){
        sentProposals = await getClientServiceProposals((await session).user.email)
    }

    return {
      props: {
        sentProposals: JSON.parse(JSON.stringify(sentProposals)),
      },
    }
  }
  