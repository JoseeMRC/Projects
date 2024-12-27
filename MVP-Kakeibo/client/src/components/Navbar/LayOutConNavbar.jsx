import { useContext } from 'react'
import { AppContext } from '../../context/AppContextProvider'

import { Outlet } from 'react-router-dom'

import { KakeiboNavbar } from './NavbarPpal/KakeiboNavbar'
import { KakeiboNavbarAdmin } from './NavbarAdmin/KakeiboNavbarAdmin'
import { KakeiboNavbarNewUser } from './NavbarUser/KakeiboNavbarNewUser'
import { KakeiboNavbarMovil } from './NavbarMovil/KakeiboNavbarMovil'

import { FooterKakeibo } from '../Footer/FooterKakeibo'
import { FooterKakeiboNewUser } from '../FooterUser/FooterKakeiboNewUser'


export const LayOutConNavbar = () => {
  const { user } = useContext(AppContext);
  
  return (
    <>
      {user?.rol === 2 && <KakeiboNavbar/>}
      {user?.rol === 1 && <KakeiboNavbarAdmin/>}
      {!user && <KakeiboNavbarNewUser/>}
   
      <Outlet/>

      {user && <FooterKakeibo/>}
      {!user && <FooterKakeiboNewUser/>} 
      {user && <KakeiboNavbarMovil/>}
    </>
  )
}
