import Landing from '@/components/Landing'
import CategoryList from '@/components/CategoryList'
import Freelancers from '@/components/Freelancers'
import Banner from '@/components/Banner'
import ServiceList from '@/components/ServiceList'
import Testimonial from '@/components/Testimonial'
import Layout from '@/components/Layout'
import { initMongoose } from '../../lib/initMongoose'
import { getAllServices } from './api/get-services'

export default function Home({ services }) {
  return (
    <Layout>
      <Landing />
      <CategoryList />
      <Freelancers />
      <Banner />
      <ServiceList services={services} />
      <Testimonial />
    </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose()

  return {
    props: {
      services: JSON.parse(JSON.stringify(await getAllServices())),
    },
  }
}
