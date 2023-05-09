import style from '@/styles/Service.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'

const Service = (props) => {
  const [freelancer, setFreelancer] = useState({})
  const router = useRouter()
  useEffect(() => {
    const fetchFreelancer = async () => {
      setFreelancer(
        (
          await axios.get(
            `http://localhost:3000/api/get-user?email=${props.service.freelancer}`,
          )
        ).data,
      )
    }
    fetchFreelancer()
  }, [])
  return (
    <div
      onClick={() =>
        !props.currentUser &&
        router.push(`/services/service/${props.service._id}`)
      }
      className={style.container}
    >
      <div className={style.headerContainer}>
        <div className={style.header}>
          {props.currentUser && <h3>{props.service.category}</h3>}
          {!props.currentUser && (
            <div className={style.freelancerDetails}>
              <Image src={freelancer?.image} width={80} height={80} />
              <div>
                <h3>
                  {freelancer?.fName} {freelancer?.lName}
                </h3>
                <p style={{ fontWeight: '400' }}>
                  {freelancer.freelancer?.title}
                </p>
                <span style={{ fontSize: '13px', fontWeight: '300' }}>
                  {freelancer?.type}
                </span>
              </div>
            </div>
          )}
          <div>
            <div className={style.desc}>
              <p>Service Category: {props.service.category}</p>
              <p>
                Service Description: {props.service.desc.substring(0, 40)}...
                <span> Read more</span>
              </p>
            </div>
            <div className={style.skills}>
              {props.service.skills.split(',').map((skill) => {
                return (
                  <div>
                    <p>{skill}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className={style.details}>
          <div>
            <h3>{props.service.name}</h3>
            <p>{props.service.createdAt}</p>
          </div>
          <div className={style.price}>
            <p>{props.service.payment} Price</p>
          </div>
          <div className={style.delivery}>
            <p>{props.service.delivery}</p>
          </div>
          <div className={style.credits}>
            <h4>
              Credits <span>({props.service.credits})</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Service
