import React from 'react';
import { Routes, Route } from "react-router-dom";

import { DcScreen } from '../components/dc/DcScreen';
import { HeroScreen } from '../components/hero/HeroScreen';
import { MarvelScrenn } from '../components/marvel/MarvelScrenn';
import { SearchScreen } from '../components/search/SearchScreen';
import { Navbar } from '../components/ui/Navbar';

export const DashboardRouter = () => {
  return (
    <>
      <Navbar />

      <div className='container'>

      <Routes>
        <Route path="/" element={<MarvelScrenn />} />
        <Route path="marvel" element={<MarvelScrenn />} />
        <Route path="dc" element={<DcScreen />} />
        <Route path='hero/:heroeId' element={<HeroScreen />} />
        <Route path="search" element={<SearchScreen />} />
    
      </Routes>
      </div>
    </>
  )
}
