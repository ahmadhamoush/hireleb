import style from '@/styles/CategoryCard.module.css'
import Image from 'next/image'

const CategoryCard = ({ title, category, image }) => {
  return (
    <div className={style.container}>
      <div className={style.overlay}></div>
      <Image className={style.img} src={image} fill alt={category} />
      <div className={style.header}>
        <p>{title}</p>
        <h3>{category}</h3>
      </div>
    </div>
  )
}

export default CategoryCard
