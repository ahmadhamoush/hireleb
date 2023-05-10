import style from '@/styles/ServiceList.module.css'
import JobCard from './JobCard'

const JobList = ({ jobs }) => {
  return (
    <div className={style.container}>
      <h2>Trending Jobs</h2>
      <div className={style.services}>
        {jobs.map((job) => {
          return <JobCard key={job._id} currentUser={false} job={job} />
        })}
      </div>
    </div>
  )
}

export default JobList
