import style from '@/styles/getStarted.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSession } from 'next-auth/react'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Animate } from 'react-simple-animate'
import GetStartedContext from '@/components/GetStartedContext'
import {
  faGears,
  faProjectDiagram,
  faSearch,
} from '@fortawesome/free-solid-svg-icons'
import Layout from '@/components/Layout'

const index = () => {
  const session = useSession()
  const router = useRouter()
  const { selectedImage, setSelectedImage, selectedFile, setSelectedFile } =
    useContext(GetStartedContext)

  function navigate() {
    router.push('/get-started-clients/options')
  }

  return (
    <Layout>
      <Animate play start={{ width: '20%' }} end={{ width: '100%' }}>
        <div className={style.scroll}></div>
      </Animate>
      <div className={style.container}>
        <div className={style.header}>
          <h1>Great - You're now part of the HireLeb community!</h1>
          <p>So, what's next? </p>
        </div>
        <div className={style.optionsContainer}>
          <div>
            <div className={style.iconContainer}>
              {' '}
              <FontAwesomeIcon className={style.icon} icon={faGears} />
            </div>
            <h3>Buy Services</h3>
            <p>
              Find your perfect solution with our fixed-price services that can
              be completed in as little as 1 hour!
            </p>
            <button type="button">Browse Services</button>
          </div>
          <div>
            <div className={style.iconContainer}>
              <FontAwesomeIcon className={style.icon} icon={faProjectDiagram} />
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
            <button type="button">Find Freelancers</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default index
