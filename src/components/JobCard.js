import style from '@/styles/Service.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

const JobCard = (props) => {
  const [client, setClient] = useState({})
  const router = useRouter()
  useEffect(() => {
    const fetchClient = async () => {
      setClient(
        (
          await axios.get(
            `http://localhost:3000/api/get-user?email=${props.job.postedBy}`,
          )
        ).data,
      )
    }
    fetchClient()
  }, [props.job.postedBy])
  return (
    <div
      onClick={() =>
        !props.currentUser && router.push(`/jobs/job/${props.job._id}`)
      }
      className={style.container}
    >
      <div className={style.headerContainer}>
        <div className={style.header}>
          {props.currentUser && <h3>{props.job.category}</h3>}
          {!props.currentUser && (
            <div className={style.freelancerDetails}>
              <Image alt="client" src={client?.image} width={80} height={80} />
              <div>
                <h3>
                  {client?.fName} {client?.lName}
                </h3>
                <p style={{ fontWeight: '400' }}>{client?.client?.title}</p>
                <span style={{ fontSize: '13px', fontWeight: '300' }}>
                  {client?.type}
                </span>
              </div>
            </div>
          )}
          <div>
            <div className={style.desc}>
              <p>Job Category: {props.job.category}</p>
              <p>
                Job Description: {props.job.description.substring(0, 40)}...
                <span> Read more</span>
              </p>
            </div>
            <div className={style.skills}>
              {props.job.skills.split(',').map((skill, index) => {
                return (
                  <div key={index}>
                    <p>{skill}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={style.details}>
          <div>
            <h3>{props.job.title}</h3>
            <p>{props.job.createdAt}</p>
          </div>
          <div className={style.price}>
            <p>{props.job.payment} Price</p>
          </div>
          <div className={style.delivery}>
            <p>{props.job.type}</p>
          </div>
          <div className={style.credits}>
            <h4>
              Credits <span>({props.job.credits})</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobCard
