import Layout from '@/components/Layout'
import style from '@/styles/Project.module.css'
import { initMongoose } from '../../../../lib/initMongoose'
import { getJob } from '@/pages/api/get-jobs'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'

const Job = ({ job }) => {
  const router = useRouter()
  function navigateBack() {
    router.back()
  }

  return (
    <Layout>
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          <div>
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
            <h3>Job Created At</h3>
            <p>{job.createdAt}</p>
            <div className={style.btns}>
              <button type="button" onClick={navigateBack}>
                Back
              </button>
            </div>
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
  let authenticated = false
  //checking if logged user owns the project
  if (session.user.email === job.postedBy) {
    authenticated = true
  } else {
    job = []
  }
  return {
    props: {
      job: JSON.parse(JSON.stringify(job)),
      authenticated,
    },
  }
}
