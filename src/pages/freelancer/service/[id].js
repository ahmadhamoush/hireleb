import Layout from '@/components/Layout'
import style from '@/styles/Project.module.css'
import { initMongoose } from '../../../../lib/initMongoose'
import { getService } from '@/pages/api/get-services'
import { getSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'

const Service = ({ service }) => {
  const router = useRouter()
  function navigateBack() {
    router.back()
  }
  function edit() {
    router.push(`/freelancer/edit-service/${service[0]._id}`)
  }
  return (
    <Layout>
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          <div>
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
            <h3>Service Created At</h3>
            <p>{service[0].createdAt}</p>
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
  let authenticated = false
  //checking if logged user owns the project
  if (session.user.email === service[0].freelancer) {
    authenticated = true
  } else {
    service = []
  }
  return {
    props: {
      service: JSON.parse(JSON.stringify(service)),
      authenticated,
    },
  }
}
