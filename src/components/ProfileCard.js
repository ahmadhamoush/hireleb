import style from '@/styles/ProfileCard.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ProfileCard = () => {
  return (
    <div className={style.container}>
      <div className={style.imageContainer}>
        <Image   alt='img' className={style.image} src="/guy.webp" fill />
      </div>
      <p>Graphic Designer</p>
      <span>John Doe</span>
      <div className={style.rate}>
        <FontAwesomeIcon className={style.icon} icon={faStar} />
        <p>4.9 (108)</p>
      </div>
    </div>
  )
}

export default ProfileCard
