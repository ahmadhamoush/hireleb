import Layout from '@/components/Layout'
import CategoryCard from '@/components/CategoryCard'
import jobCategories from '../../../lib/jobCategories'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
const Category = () => {
  const [categoriesList, setCategoriesList] = useState([])
  useEffect(() => {
    setCategoriesList(jobCategories.categories)
  }, [categoriesList])

  const router = useRouter()

  return (
    <Layout>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '25px',
        }}
      >
        {categoriesList
          .filter((category) => category.name === router.query.category)
          .map((category) =>
            category.subcategories.map((sub) => {
              return (
                <CategoryCard
                  key={sub.name}
                  category={sub.name}
                  image={sub.image}
                />
              )
            }),
          )}
      </div>
    </Layout>
  )
}

export default Category
