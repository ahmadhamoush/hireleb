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
    <div onClick={()=>!props.currentUser && router.push(`/services/service/${props.service._id}`)} className={style.container}>
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
                <p>{freelancer.freelancer?.title}</p>
              </div>
            </div>
          )}
          <div>
            <div className={style.desc}>
              <p>Service Description: {props.service.desc}</p>
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
        </div>
      </div>
    </div>
  )
}

export default Service
