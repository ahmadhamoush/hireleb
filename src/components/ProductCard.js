
import style from '@/styles/ProductCard.module.css'
import Link from "next/link"
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const ProductCard = () => {
  return (
   <div className={style.container}>
    <div className={style.imageContainer}>
    <Image className={style.image} src='/guy.webp' fill/>
    </div>
    <p>Graphic Designer</p>
    <span>John Doe</span>
    <div className={style.rate}>
    <FontAwesomeIcon className={style.icon} icon={faStar}/>
    <p>4.9 (108)</p>
    </div>
   </div>
  )
}

export default ProductCard
