import Layout from '@/components/Layout'
import style from '@/styles/Ongoing.module.css'
import { getSession, useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'
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
  const [updateValue,setUpdate] = useState('')
  const router = useRouter()
  const session = useSession()
  const ref = useRef()

  useEffect(()=>{
    if(document.querySelector(`.${style.updates}`)){
     document.querySelectorAll(`.${style.updates}`).forEach(element=>{
      element.scrollTop = element.scrollHeight;
     })
    }

  },[isReceived,isSent])
  const updateService = async (id) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', id)
      formData.append('message', updateValue)
      formData.append('sender', session.data.user.email)
      const { data } = await axios.post(
        '/api/update-ongoing-service',
        formData,
      )
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
      const { data } = await axios.post(
        '/api/update-ongoing-job',
        formData,
      )
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
               <>
                   <div className={style.proposalFlex}>
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
                      <h3 style={{color:'#feff5c'}}>In Progress...</h3>     
                    </div>
                           <div className={style.updatesContainer}>
                           <h3>Update</h3>
                         <div className={style.updates}>
                         {proposal.updates.map(update=>{
                             return (<div className={update.sender === proposal.freelancer ? style.updateSender:style.updateReceiver}>
                               <p className={style.msg}>{update.message}</p>
                              <div className={style.from}> <p>from {update.sender}</p>
                               <p>{update.date}</p></div>
                             </div>)
                           })}
                     
                         </div>
                         <div className={style.sendContainer}>
                           <input  value={updateValue} onChange={(e)=>setUpdate(e.target.value)} placeholder='Send an Update!'/>
                           <button disabled={!updateValue.length && true} onClick={()=>updateJob(proposal._id)} className={style.send}>Send</button>
                         </div>
                           </div>

                   </div>
                           </>
                  )
                })}
              </div>
            )}
            {isSent && (
              <div className={style.proposalsContainer}>
                {sentProposals.map((proposal) => {
                  return (
              <>
                  <div className={style.proposalFlex}>
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
                      <h3 style={{color:'#feff5c'}}>In Progress...</h3>     
                    </div>
                      <div className={style.updatesContainer}>
                      <h3>Updates</h3>
                    <div ref={ref} className={style.updates}>
                    {proposal.updates.map(update=>{
                        return (<div className={update.sender === proposal.freelancer ? style.updateSender:style.updateReceiver}>
                          <p className={style.msg}>{update.message}</p>
                         <div className={style.from}> <p>from {update.sender}</p>
                          <p>{update.date}</p></div>
                        </div>)
                      })}
                 <div className={style.sendContainer}>
                      <input  value={updateValue} onChange={(e)=>setUpdate(e.target.value)} placeholder='Send an Update!'/>
                      <button disabled={!updateValue.length && true} onClick={()=>updateService(proposal._id)} className={style.send}>Send</button>
                    </div>
                    </div>
                   
                      </div>
                  </div>
                      </>
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
