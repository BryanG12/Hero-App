import React from 'react'
import { HeroList } from '../hero/HeroList'

export const DcScreen = () => {
  const publisher='DC Comics';

  return (
    <div>
      <h1>Dc Screen</h1>
      <hr/>

      <HeroList publisher={publisher} />
    </div>
  )
}
