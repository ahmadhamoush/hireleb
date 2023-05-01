import style from '@/styles/Service.module.css'

const Service = (props) => {
  return (
    <div className={style.container}>
      <div className={style.circle}></div>
      <div className={style.headerContainer}>
        <div className={style.header}>
          <h3>{props.owner}</h3>
          <p>{props.service.createdAt}</p>
        </div>
        <div className={style.price}>
          <p>{props.service.payment} Price</p>
        </div>
      </div>
      <div className={style.desc}>
        <p>Job Title: {props.service.name}</p>
        <p>Job Description: {props.service.desc}</p>
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
  )
}

export default Service
