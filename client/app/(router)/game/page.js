import GameCard from '@/app/_components/GameCard'
import TitleBanner from '@/app/_components/TitleBanner'
import React from 'react'

const page = () => {
  return (
    <div className='max-w-screen-2xl mx-auto px-5 py-3 bg-inherit'>
      <TitleBanner src={'/background1.jpg'} title={'Semua Game'}/>
      <GameCard/>
    </div>
  )
}

export default page