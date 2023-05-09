import Layout from '@/components/Layout'
import style from '@/styles/Project.module.css'
import { initMongoose } from '../../../../lib/initMongoose'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '@/components/Loader'
import { getJob } from '@/pages/api/get-jobs'
import { getFreelancerJobProposals } from '@/pages/api/get-job-proposals'

const Job = ({ job, proposed, ongoing }) => {
  const router = useRouter()
  const session = useSession()
  const [client, setClient] = useState({})
  const [isProposal, setIsProposal] = useState(false)
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchClient = async () => {
      setClient(
        (
          await axios.get(
            `http://localhost:3000/api/get-user?email=${job.postedBy}`,
          )
        ).data,
      )
    }
    fetchClient()
  }, [])

  const handleUpload = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', job._id)
      formData.append('freelancer', session.data.user.email)
      formData.append('client', job.postedBy)
      formData.append('proposal', proposal)

      const { data } = await axios.post('/api/job-proposal', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Proposal Sent')
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
          <div>
            <div className={style.freelancerDetails}>
              <Image src={client?.image} width={80} height={80} />
              <div>
                <h3>
                  {client?.fName} {client?.lName}
                </h3>
                <p>{client.client?.title}</p>
              </div>
            </div>
            <h3>Job Name</h3>
            <p>{job.title}</p>
            <h3>Job Description</h3>
            <p>{job.description}</p>
            <h3>Job Category</h3>
            <p>{job.category}</p>
            <h3>Job Subcategory</h3>
            <p>{job.subcategory}</p>
            <h3>Job Skills</h3>
            <div className={style.skills}>
              {job.skills.split(',').map((skill) => {
                return (
                  <div>
                    <p>{skill}</p>
                  </div>
                )
              })}
            </div>
            <h3>Job Experience</h3>
            <p>{job.experience}</p>
            <h3>Job Payment Type</h3>
            <p>{job.payment}</p>
            <h3>Job Credits</h3>
            <p>{job.credits}</p>
            <h3>Job Type</h3>
            <p>{job.type}</p>

            <div className={style.btnsWrapper}>
              {!proposed ||
                (!ongoing && (
                  <h3>
                    Interested? Send a
                    <span style={{ color: '#2d646d' }}> Proposal</span> now!
                  </h3>
                ))}
              {!isProposal && !ongoing && (
                <div className={style.btns}>
                  <button
                    style={{
                      color: proposed && 'rgb(241, 84, 84)',
                      color: ongoing && 'green',
                    }}
                    disabled={proposed || ongoing ? true : false}
                    onClick={() => setIsProposal(true)}
                    type="button"
                  >
                    {proposed ? 'Already Proposed ' : 'Send a Proposal'}
                  </button>
                </div>
              )}
              {ongoing && (
                <h3 style={{ color: ongoing && 'green' }}>
                  ...Job is currently on going...
                </h3>
              )}
            </div>
            {isProposal && (
              <div>
                <textarea
                  value={proposal}
                  onChange={(e) => setProposal(e.target.value)}
                  rows="8"
                  cols="30"
                  id={style.desc}
                  placeholder="Write a proposal"
                />
                <div className={style.btns}>
                  <button onClick={() => setIsProposal(false)} type="button">
                    Cancel
                  </button>
                  <button onClick={handleUpload} type="button">
                    Send
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default Job
export async function getServerSideProps(context) {
  //destructuring context object to get id param
  const { query } = context
  const { id } = query
  //getting session details
  const session = await getSession(context)
  //connecting to db
  await initMongoose()
  //getting project based on query id
  let job = await getJob(id)
  let proposals = await getFreelancerJobProposals(session.user.email)

  let proposed = false
  let ongoing = false
  proposals.forEach((proposal) => {
    if (
      proposal.job._id.toString() === id &&
      proposal.freelancer === session.user.email &&
      proposal.status === 'pending'
    ) {
      proposed = true
    }
    if (
      proposal.job._id.toString() === id &&
      proposal.freelancer === session.user.email &&
      proposal.status === 'accepted'
    ) {
      ongoing = true
    }
  })

  return {
    props: {
      job: JSON.parse(JSON.stringify(job)),
      proposed,
      ongoing,
    },
  }
}
