import type { NextPage } from 'next'
import Layout from '../layouts/Layout'
import Stepper from '../components/Stepper';
import HomeProductSection from '../components/HomeProductSection';

const Home: NextPage = () => {
  return (
    <Layout>
      <div>
        <Stepper />
        <HomeProductSection />
      </div>
    </Layout>

  )
}

export default Home;

