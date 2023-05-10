import Layout from "@/components/Layout"
import CategoryCard from "@/components/CategoryCard"
import jobCategories from "../../../lib/jobCategories"
import { useEffect, useState } from 'react'
import { useRouter } from "next/router"
const Categories = () => {
    const [categoriesList, setCategoriesList] = useState([])
    useEffect(() => {
      setCategoriesList(jobCategories.categories)
    }, [categoriesList])
  
    const router = useRouter()
  return (
    <Layout>
        <div style={{display:'flex',flexWrap:'wrap',gap:'20px',justifyContent:'center',alignItems:'center',padding:'25px'}}>
        {categoriesList.map(category=>{
      return (
       <div onClick={()=>router.push(`/categories/${category.name}`)}>
         <CategoryCard
        category={category.name}
        image={category.image}
      />

       </div>
      )
     })}
        </div>
    </Layout>
  )
}

export default Categories
