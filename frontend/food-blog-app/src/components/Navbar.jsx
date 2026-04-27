//.components/Navbar.jsx
import React, { useEffect } from 'react'
import { useState } from 'react'
import { NavLink } from "react-router-dom"
import Modal from './modal'
import IntputForm from './IntputForm'

export default function Navbar() {
    const [isOpen,setIsOpen]=useState(false)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [isLogin,setIsLogin]=useState(token ? false : true)
    let user=JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
      const storedToken = localStorage.getItem("token")
      setToken(storedToken)
       setIsLogin(storedToken ? false : true)
    }, [isOpen])

    const checkLogin = () => {
  const storedToken = localStorage.getItem("token")

  if (storedToken) {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    setToken(null)
    setIsLogin(true)
  } else {
    setIsOpen(true)
  }
}

  return (
   <>
     <header>
         <h2>Food Blog</h2>
         <ul>
             <li><NavLink to="/">Home</NavLink></li>
             <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/myRecipe" : "/"}>My Recipe</NavLink></li>
             <li onClick={()=>isLogin && setIsOpen(true)}><NavLink to={ !isLogin ? "/favRecipe" : "/"}>Favourites</NavLink></li>
             <li onClick={checkLogin}><p className='login'>{ (isLogin)? "Login": "Logout" }{user?.email ? `(${user?.email})` : ""}</p></li>
         </ul>
     </header>
     { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><IntputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
   </>
  )
}
