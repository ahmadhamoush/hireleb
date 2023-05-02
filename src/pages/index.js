import Landing from '@/components/Landing'
import CategoryList from '@/components/CategoryList'
import Freelancers from '@/components/Freelancers'
import Banner from '@/components/Banner'
import ServiceList from '@/components/ServiceList'
import JobList from '@/components/JobList'
import Testimonial from '@/components/Testimonial'
import Layout from '@/components/Layout'
import { initMongoose } from '../../lib/initMongoose'
import { getAllServices } from './api/get-services'
import { getJobs } from './api/get-jobs'

export default function Home({ services, jobs }) {
  return (
    <Layout>
      <Landing />
      <CategoryList />
      <Freelancers />
      <Banner />
      <ServiceList services={services} />
      <JobList jobs={jobs} />
      <Testimonial />
    </Layout>
  )
}

export async function getServerSideProps() {
  await initMongoose()
  return {
    props: {
      services: JSON.parse(JSON.stringify(await getAllServices())),
      jobs: JSON.parse(JSON.stringify(await getJobs())),
    },
  }
}
