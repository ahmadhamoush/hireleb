import style from '@/styles/CategoryList.module.css'
import CategoryCard from './CategoryCard'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

const CategoryList = () => {
  return (
    <div className={style.container}>
      <h2>Unlock Your Potential with Our Comprehensive Talent Solutions</h2>
      <div className={style.list}>
        <CategoryCard
          title="Create your digital presence"
          category="Website Development"
          image="/web.jpg"
        />
        <CategoryCard
          title="Get found online"
          category="SEO"
          image="/seo.jpg"
        />
        <CategoryCard
          title="Make your brand stand out"
          category="Logo Design"
          image="/logo.jpg"
        />
        <CategoryCard
          title="Connect with your audience"
          category="Digital Marketing"
          image="/marketing.jpg"
        />
      </div>
      <Link href="/categories" className={style.all}>
        <p>All Categories</p> <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  )
}

export default CategoryList
