import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import HealthTips from '../components/HealthTips'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
       <Header />
       <SpecialityMenu />
       <HealthTips />
       <Banner />
    </div>
  )
}

export default Home