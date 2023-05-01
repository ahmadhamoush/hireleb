import Layout from '@/components/Layout'
import style from '@/styles/Project.module.css'
import { initMongoose } from '../../../../lib/initMongoose'
import { getProject } from '@/pages/api/get-projects'
import { getSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Project = ({ project }) => {
  const router = useRouter()
  function navigateBack() {
    router.back()
  }
  function edit() {
    router.push(`/freelancer/edit-project/${project[0]._id}`)
  }
  return (
    <Layout>
      <div className={style.container}>
        <div>
          <h3>Project Name</h3>
          <p>{project[0].name}</p>
          <h3>Project Description</h3>
          <p>{project[0].desc}</p>
          <h3>Project URL</h3>
          <p>{project[0].url}</p>
          <Image src={project[0].image} width={380} height={200} />
          <div className={style.btns}>
            <button type="button" onClick={navigateBack}>
              Back
            </button>
            <button type="button" onClick={edit}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Project
export async function getServerSideProps(context) {
  //destructuring context object to get id param
  const { query } = context
  const { id } = query
  //getting session details
  const session = await getSession(context)
  //connecting to db
  await initMongoose()
  //getting project based on query id
  let project = await getProject(id)
  let authenticated = false
  //checking if logged user owns the project
  if (session.user.email === project[0].owner) {
    authenticated = true
  } else {
    project = []
  }

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
      authenticated,
    },
  }
}
