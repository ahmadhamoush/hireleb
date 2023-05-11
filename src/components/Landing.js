import style from '@/styles/Landing.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import 'react-responsive-carousel/lib/styles/carousel.min.css' // requires a loader
import { Carousel } from 'react-responsive-carousel'
import ProfileCard from './ProfileCard'

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.links}>
        <ul>
          <Link href="/services">
            {' '}
            <li>Browse Services</li>
          </Link>
          <Link href="/jobs">
            {' '}
            <li>Browse Jobs</li>
          </Link>
          <Link href="/profiles">
            {' '}
            <li>Find Freelancers and Clients</li>
          </Link>
        </ul>
      </div>
      <div className={style.banner}>
        <div className={style.vision}>
          <h1>Turn your vision into reality</h1>
          <p>
            Find your next hire or dream job in Lebanon on our trusted platform
            used by <br /> professionals across the country.
          </p>
          <div className={style.searchContainer}>
            <div className={style.search}>
              <input type="text" placeholder="search" />
              <FontAwesomeIcon className={style.icon} icon={faSearch} />
            </div>
            <div className={style.keywords}>
              <p>Suggested Keywords</p>
              <ul>
                <li>Web Developer</li>
                <li>3D Artist</li>
                <li>Web Designer</li>
                <li>Product Manager</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={style.carousel}>
          <Carousel showThumbs={false} showArrows={false}>
            <div>
              <Image
                className={style.image}
                src="/showcase1.png"
                width={200}
                height={350}
                alt="img"
              />
              <ProfileCard />
            </div>
            <div>
              <Image
                className={style.image}
                src="/showcase1.png"
                width={200}
                height={350}
                alt="img"
              />
              <ProfileCard />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default Landing
