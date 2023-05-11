import Layout from '@/components/Layout'
import style from '@/styles/howItWorks.module.css'
import { useRouter } from 'next/router'
const How = () => {
  const router = useRouter()
  return (
    <Layout>
      <div className={style.container}>
        <h1>
          How Hire<span>Leb</span> Works
        </h1>
        <div className={style.wrapper}>
          <h3>Buyers</h3>
          <p>
            As a buyer on our platform, you have access to a pool of talented
            freelancers and agencies to help you get your projects done. Post
            your project, receive proposals from qualified professionals, and
            select the right fit for your project.
          </p>
          <button>Find Freelancers</button>
          <div className={style.steps}>
            <div className={style.card}>
              <div>
                <p>1</p>
              </div>
              <p>Sign up and post your job</p>
            </div>
            <div className={style.card}>
              <div>
                <p>2</p>
              </div>
              <p>Receive proposals from skilled freelancers</p>
            </div>
            <div className={style.card}>
              <div>
                <p>3</p>
              </div>
              <p>Review and select the best fit for your project</p>
            </div>
            <div className={style.card}>
              <div>
                <p>4</p>
              </div>
              <p>Work with the freelancer to complete the project</p>
            </div>
            <div className={style.card}>
              <div>
                <p>5</p>
              </div>
              <p>Release payment securely through our platform</p>
            </div>
          </div>
        </div>
        <div className={style.wrapper}>
          <h3>Freelancers</h3>
          <p>
            As a freelancer on our platform, you have the opportunity to
            showcase your skills and connect with clients looking for your
            services. Create a profile, showcase your portfolio, and start
            applying for jobs today.
          </p>
          <button onClick={() => router.push('/jobs')}>Browse Jobs</button>
          <div className={style.steps}>
            <div className={style.card}>
              <div>
                <p>1</p>
              </div>
              <p>Sign up and create your profile</p>
            </div>
            <div className={style.card}>
              <div>
                <p>2</p>
              </div>
              <p>Browse and apply to relevant job postings</p>
            </div>
            <div className={style.card}>
              <div>
                <p>3</p>
              </div>
              <p>Discuss project details and submit proposals</p>
            </div>
            <div className={style.card}>
              <div>
                <p>4</p>
              </div>
              <p>Get hired and complete the project</p>
            </div>
            <div className={style.card}>
              <div>
                <p>5</p>
              </div>
              <p>Get paid securely through our platform</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default How
