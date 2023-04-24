import style from '@/styles/Service.module.css'
import Image from 'next/image'

const Service = () => {
  return (
    <div className={style.container}>
      <div className={style.circle}></div>
      <div className={style.headerContainer}>
        <div className={style.header}>
          <h3>React JS Developer</h3>
          <p>Mar 27</p>
        </div>
        <div className={style.price}>
          <p>Fixed Price</p>
        </div>
      </div>
      <div className={style.desc}>
        <p>
          Job Title: React JS Developer Contract Duration: 2+ Months (can be
          extended)
        </p>
        <p>Job : Remote/Work from home Job Description: We ar...</p>
      </div>
      <div className={style.skills}>
        <div>
          <p>Web Development</p>
        </div>
        <div>
          <p>React</p>
        </div>
      </div>
    </div>
  )
}

export default Service
