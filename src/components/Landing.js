import style from '@/styles/Landing.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Link from "next/link"
import Image from 'next/image'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ProductCard from './ProductCard'

const Landing = () => {
  return (
  <div className={style.container}>
    <div className={style.links}>
        <ul>
            <li>
                Browse Jobs
            </li>
            <li>
                Find Talent
            </li>
            <li>
                Looking For Work
            </li>
        </ul>
    </div>
    <div className={style.banner}>
        <div className={style.vision}>
            <h1>Turn your vision into reality</h1>
            <p>Find your next hire or dream job in Lebanon on our trusted platform used by <br /> professionals across the country.</p>
        <div className={style.searchContainer}>
        <div className={style.search}>
            <input type="text" placeholder="search"/>
            <FontAwesomeIcon className={style.icon} icon={faSearch} />
        </div>
        <div className={style.keywords}>
                <p>Suggested Keywords</p>
                  <ul>
                    <li>
                    Web Developer
                    </li>
                    <li>3D Artist</li>
                    <li>Web Designer</li>
                    <li>Product Manager</li>
                    </ul>
              
            </div>
        </div>
        </div>
        <div className={style.carousel}>
            <Carousel  showThumbs={false}  showArrows={false}>
                <div>
                <Image className={style.image} src='/showcase1.png' width={200} height={350} />
                <ProductCard />
                </div>
                <div>
                <Image className={style.image} src='/showcase1.png' width={200} height={350} />
                <ProductCard />
                </div>
            </Carousel>
           
        </div>
    </div>
  </div>
  )
}

export default Landing
