import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { LoginScreen } from '../components/login/LoginScreen';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';

import { DashboardRouter } from './DashboardRouter';

export const AppRouter = () => {
  return (
    <BrowserRouter>

      <Routes>

        <Route path='/login' element={
          <PublicRoute>
            <LoginScreen />
          </PublicRoute>
        }
        />
        <Route path='/*' element={
            <PrivateRoute>
              <DashboardRouter/>
            </PrivateRoute>
          }
        />
        {/* <Route path='/*' element={<DashboardRouter /> } /> */}
        
      </Routes>
    </BrowserRouter>
  )
}
