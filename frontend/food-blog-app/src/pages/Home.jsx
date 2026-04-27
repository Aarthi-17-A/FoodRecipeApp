// ./pages/Home.jsx
import React from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import RecipeItems from '../components/RecipeItems'  
import { useLoaderData, useNavigate } from "react-router-dom"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState } from 'react'
import Modal from '../components/modal'
import IntputForm from '../components/IntputForm'


export const Home = () => {
   const navigate = useNavigate()
   const [isOpen, setIsOpen]=useState(false)

   const addRecipe=()=>{
     let token=localStorage.getItem("token")
     if(token)
      navigate("/addRecipe")
     else{
      setIsOpen(true)
     }
   }

   const recipes = useLoaderData()   
   console.log(recipes)              


  return (
    <>  
      <section className='home'>
      
       <div className='left'>
         <h1>Food Recipe</h1>
         <h5>Discover, create, and share delicious recipes that bring joy to every meal, Your personal space to explore flavors, cook with love, and save every favorite recipe.Every recipe tells a story — start cooking yours today</h5>
         <button className="left-button"  onClick={addRecipe}>Share Your Recipe</button>
       </div>

       <div className='right'>
         <img src={foodRecipe} width="320px" height="300px" />
       </div>

       <div className='bg'>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
           <path fill="#d4f6e8" fillOpacity="1" 
             d="M0,32L40,32C80,32,160,32,240,58.7C320,85,400,139,480,149.3C560,160,640,128,720,101.3C800,75,880,53,960,80C1040,107,1120,181,1200,213.3C1280,245,1360,235,1400,229.3L1440,224L1440,320L0,320Z">
           </path>
          </svg>     
       </div>
      </section>
       { (isOpen) && <Modal onClose={()=> setIsOpen(false)}><IntputForm setIsOpen={()=> setIsOpen(false)}/></Modal>}
      <div className='recipe'>
        <RecipeItems recipes={recipes}/>
      </div>
    </>
  )
}



