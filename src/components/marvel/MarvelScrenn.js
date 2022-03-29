import React from 'react'
import { HeroList } from '../hero/HeroList'

export const MarvelScrenn = () => {

  const publisher='Marvel Comics';

  return (
    <div>
      <h1>MarvelScrenn</h1>
      <hr/>
      
      <HeroList publisher={publisher} />
    </div>
  )
}
