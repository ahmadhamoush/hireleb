import style from '@/styles/ServiceList.module.css'
import Service from './Service'

const ServiceList = ({ services }) => {
  return (
    <div className={style.container}>
      <h2>Trending Services</h2>
      <div className={style.services}>
        {services.map((service) => {
          return (
            <Service key={service._id} currentUser={false} service={service} />
          )
        })}
      </div>
    </div>
  )
}

export default ServiceList
