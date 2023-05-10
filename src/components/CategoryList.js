import style from '@/styles/CategoryList.module.css'
import CategoryCard from './CategoryCard'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import jobCategories from '../../lib/jobCategories'
import { useEffect, useState } from 'react'

const CategoryList = () => {

  const [categoriesList, setCategoriesList] = useState([])
  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  return (
    <div className={style.container}>
      <h2>Unlock Your Potential with Our Comprehensive Talent Solutions</h2>
      <div className={style.list}>
     {categoriesList.map(category=>{
      return (
        <CategoryCard
        key={category._id}
        category={category.name}
        image={category.image}
      />

      )
     })}
      </div>
      <Link href="/categories" className={style.all}>
        <p>All Categories</p> <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  )
}

export default CategoryList
