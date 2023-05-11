import Layout from '@/components/Layout'
import { getSession } from 'next-auth/react'
import { initMongoose } from '../../../../lib/initMongoose'
import { getFreelancerServiceProposals } from '@/pages/api/get-service-proposals'
import { getFreelancerJobProposals } from '@/pages/api/get-job-proposals'
import Link from 'next/link'
import style from '@/styles/Completed.module.css'
import { useRouter } from 'next/router'

const Completed = ({ receivedProposals, sentProposals }) => {
  const router = useRouter()
  return (
    <Layout>
      <div className={style.container}>
        {receivedProposals.map((completed, index) => {
          return (
            <div
              onClick={() => router.push(`/rate/${completed.client}`)}
              key={index}
              className={style.completed}
            >
              <h3>Type</h3>
              <p>Service</p>
              <h3>Service Name</h3>
              <p>{completed.service[0].name}</p>
              <Link href={`/freelancer/service/${completed.service[0]._id}`}>
                <p>View Service</p>
              </Link>
              <h3>Client</h3>
              <p>{completed.client}</p>
              <h3>Rated</h3>
              <p> No</p>
              <button>Rate</button>
            </div>
          )
        })}
        {sentProposals.map((completed, index) => {
          return (
            <div
              onClick={() => router.push(`/rate/${completed.client}`)}
              key={index}
              className={style.completed}
            >
              <h3>Type</h3>
              <p>Job</p>
              <h3>Job Name:</h3>
              <p>{completed.title}</p>
              <Link href={`/jobs/job/${completed.job._id}`}>
                <p>View Job</p>
              </Link>
              <h3>Client</h3>
              <p>{completed.client}</p>
              <h3>Rated</h3>
              <p>No</p>
              <button>Rate</button>
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default Completed

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
    (proposal) => proposal.status === 'completed',
  )
  receivedProposals = receivedProposals.filter(
    (proposal) => proposal.status === 'completed',
  )

  return {
    props: {
      receivedProposals: JSON.parse(JSON.stringify(receivedProposals)),
      sentProposals: JSON.parse(JSON.stringify(sentProposals)),
    },
  }
}
