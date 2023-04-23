import style from '@/styles/Banner.module.css'
import Image from 'next/image'

const Banner = () => {
  return (
   <div className={style.container}>
   <div className={style.description}>
    <h2>Build Your Portfolio and CV with Our Website</h2>
    <p>At our website, you can create a personalized portfolio and professional CV that showcases your skills and accomplishments. Our easy-to-use platform allows you to upload past projects, include testimonials, and highlight your qualifications. Sign up today and take your career to the next level!</p>
    <button className={style.btn}>Build Now</button>
   </div>
   <div className={style.imageContainer}>
    <Image src='/banner.png' fill className={style.image} />
   </div>
   </div>
  )
}

export default Banner
