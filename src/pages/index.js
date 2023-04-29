import Head from 'next/head'
import Navbar from '@/components/Navbar'
import Landing from '@/components/Landing'
import CategoryList from '@/components/CategoryList'
import Freelancers from '@/components/Freelancers'
import Banner from '@/components/Banner'
import ServiceList from '@/components/ServiceList'
import Testimonial from '@/components/Testimonial'
import Footer from '@/components/Footer'
import Layout from '@/components/Layout'

export default function Home() {
  return (
    <Layout>
      <Landing />
      <CategoryList />
      <Freelancers />
      <Banner />
      <ServiceList />
      <Testimonial />
    </Layout>
  )
}
