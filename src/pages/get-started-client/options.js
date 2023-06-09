import style from '@/styles/getStarted.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'
import {
  faGears,
  faProjectDiagram,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import Layout from '@/components/Layout'

const Options = () => {
  const router = useRouter()
  return (
    <Layout>
      <Animate play start={{ width: '20%' }} end={{ width: '100%' }}>
        <div className={style.scroll}></div>
      </Animate>
      <Animate play start={{ opacity: 0 }} end={{ opacity: 1 }}>
        <div className={style.container}>
          <div className={style.header}>
            <h1>Great - You are now part of the HireLeb community!</h1>
            <p>So, whats next? </p>
          </div>
          <div className={style.optionsContainer}>
            <div>
              <div className={style.iconContainer}>
                {' '}
                <FontAwesomeIcon className={style.icon} icon={faGears} />
              </div>
              <h3>Buy Services</h3>
              <p>
                Find your perfect solution with our fixed-price services that
                can be completed in as little as 1 hour!
              </p>
              <button onClick={() => router.push('/services')} type="button">
                Browse Services
              </button>
            </div>
            <div>
              <div className={style.iconContainer}>
                <FontAwesomeIcon
                  className={style.icon}
                  icon={faProjectDiagram}
                />
              </div>
              <h3>Post Your Project</h3>
              <p>
                Share your project requirements with us and let our pool of
                talented freelancers send you their proposals.
              </p>
              <button onClick={() => router.push('/post-a-job')} type="button">
                Post Job
              </button>
            </div>
            <div>
              <div className={style.iconContainer}>
                <FontAwesomeIcon className={style.icon} icon={faSearch} />
              </div>
              <h3>Discover Freelancers</h3>
              <p>
                Explore our network of skilled freelancers and find the right
                match for your project needs.
              </p>
              <button onClick={() => router.push('/profiles')} type="button">
                Search Profiles
              </button>
            </div>
          </div>
        </div>
      </Animate>
    </Layout>
  )
}

export default Options
