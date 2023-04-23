import style from '@/styles/ServiceList.module.css'
import Image from 'next/image'
import Service from './Service'

const ServiceList = () => {
  return (
   <div className={style.container}>
    <h2>Trending Services</h2>
    <div className={style.services}>
    <Service />
    <Service />
    <Service />
    <Service />
    <Service />
    <Service />
    </div>
   </div>
  )
}

export default ServiceList
