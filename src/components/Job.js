import style from '@/styles/Service.module.css'

const Job = (props) => {
  return (
    <div className={style.container}>
      <div className={style.headerContainer}>
        <div className={style.header}>
          <h3>{props.job.title}</h3>
          <p>{props.job.createdAt}</p>
        </div>
        <div className={style.price}>
          <p>{props.job.payment} Price</p>
        </div>
      </div>
      <div className={style.desc}>
        <p>Job Description: {props.job.description}</p>
      </div>
      <div className={style.skills}>
        {props.job.skills.split(',').map((skill,index) => {
          return (
            <div key={index}>
              <p>{skill}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Job
