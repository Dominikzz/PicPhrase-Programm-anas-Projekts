import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Start from "./pages/start/start.jsx"
import SignIn from "./pages/signIn/signin.jsx"
import Home from "./pages/home/home.jsx"
import Profile from './pages/profile/profile.jsx';
import Game from './pages/game/game.jsx';
import ProfileSetup from './pages/profileSetup/profileSetup.jsx';
import Settings from './pages/settings/settings.jsx';
import GameLoader from './pages/game/gameLoader.jsx';
import Admin from './pages/admin/admin.jsx';
import UnderDevelopment from './pages/underDevelopment/underDevelopment.jsx';
import './assets/global.scss';


export default function app() {
  return (
    <Routes>
      <Route path='/' element={<Start />}/>
      <Route path='/signin' element={<SignIn />}/>
      <Route path='/profileSetup' element={<ProfileSetup />}/>
      <Route path='/home' element={<Home />}/>
      <Route path='/profile' element={<Profile />}/>
      <Route path='/settings' element={<Settings />}/>
      <Route path='/game' element={<Game />}/>
      <Route path='/gameLoader' element={<GameLoader />}/>
      <Route path='/admin' element={<Admin />}/>
      <Route path='/underDevelopment' element={<UnderDevelopment />}/>
    </Routes>
  )
}
