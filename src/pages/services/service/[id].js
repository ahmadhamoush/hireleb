import Layout from '@/components/Layout'
import style from '@/styles/Project.module.css'
import { initMongoose } from '../../../../lib/initMongoose'
import { getService } from '@/pages/api/get-services'
import { getSession, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import { getClientServiceProposals } from '@/pages/api/get-service-proposals'
import Loader from '@/components/Loader'

const Service = ({ service, proposed, ongoing }) => {
  const router = useRouter()
  const session = useSession()
  const [freelancer, setFreelancer] = useState({})
  const [isProposal, setIsProposal] = useState(false)
  const [proposal, setProposal] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFreelancer = async () => {
      setFreelancer(
        (
          await axios.get(
            `http://localhost:3000/api/get-user?email=${service[0].freelancer}`,
          )
        ).data,
      )
    }
    fetchFreelancer()
  }, [service])

  const handleUpload = async () => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('id', service[0]._id)
      formData.append('client', session.data.user.email)
      formData.append('freelancer', service[0].freelancer)
      formData.append('proposal', proposal)

      const { data } = await axios.post('/api/service-proposal', formData)
      if (data.done === 'ok') {
        setLoading(false)
        toast('Proposal Sent')
        // router.push(`/client/${session.data.user.email}`)
      }
    } catch (err) {
      console.log(err)
      toast('You must be logged in to send a proposal')
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
              <Image
                alt="freelancer"
                src={freelancer?.image}
                width={80}
                height={80}
              />
              <div>
                <h3>
                  {freelancer?.fName} {freelancer?.lName}
                </h3>
                <p>{freelancer.freelancer?.title}</p>
              </div>
            </div>
            <h3>Service Name</h3>
            <p>{service[0].name}</p>
            <h3>Service Description</h3>
            <p>{service[0].desc}</p>
            <h3>Service Category</h3>
            <p>{service[0].category}</p>
            <h3>Service Subcategory</h3>
            <p>{service[0].subcategory}</p>
            <h3>Service Skills</h3>
            <div className={style.skills}>
              {service[0].skills.split(',').map((skill, index) => {
                return (
                  <div key={index}>
                    <p>{skill}</p>
                  </div>
                )
              })}
            </div>
            <h3>Service Experience</h3>
            <p>{service[0].experience}</p>
            <h3>Service Payment Type</h3>
            <p>{service[0].payment}</p>
            <h3>Service Credits</h3>
            <p>{service[0].credits}</p>
            <h3>Service delivery</h3>
            <p>{service[0].delivery}</p>
            <h3>Service Duration</h3>
            <p>
              {service[0].time} {service[0].duration}
            </p>

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
                  ...Service is currently on going...
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

export default Service
export async function getServerSideProps(context) {
  //destructuring context object to get id param
  const { query } = context
  const { id } = query
  //getting session details
  const session = await getSession(context)
  //connecting to db
  await initMongoose()
  //getting project based on query id
  let service = await getService(id)
  let proposals = await getClientServiceProposals(session?.user.email)

  let proposed = false
  let ongoing = false
  proposals.forEach((proposal) => {
    if (
      proposal.service[0]._id.toString() === id &&
      proposal.client === session.user.email &&
      proposal.status === 'pending'
    ) {
      proposed = true
    }
    if (
      proposal.service[0]._id.toString() === id &&
      proposal.client === session.user.email &&
      proposal.status === 'accepted'
    ) {
      ongoing = true
    }
  })

  return {
    props: {
      service: JSON.parse(JSON.stringify(service)),
      proposed,
      ongoing,
    },
  }
}
