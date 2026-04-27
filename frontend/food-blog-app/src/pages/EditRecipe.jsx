// .pages/EditRecipe.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"   
import axios from "axios"                        

export default function EditRecipe() {
 const [recipeData,setRecipeData]=useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: ""
 })
    const navigate=useNavigate()
    const{id}=useParams()

useEffect(() => {
    const getData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/recipe/${id}`)
            
            console.log("FULL RESPONSE:", response)   
            console.log("DATA:", response.data)       

            let res = response.data

            setRecipeData({
                title: res.title,
                ingredients: res.ingredients.join(","),
                instructions: res.instructions,
                time: res.time
            })
        } catch (err) {
            console.log("ERROR:", err.response || err.message) 
        }
    }
    getData()
}, [id])

              

    const onHandleChange = (e) => {
    let val = (e.target.name === "coverimage") 
        ? e.target.files[0] 
        : e.target.value

    setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
}
    const onHandleSubmit=async(e)=>{
        e.preventDefault()
    

       const formData = new FormData()

      formData.append("title", recipeData.title)
      formData.append("time", recipeData.time)
      formData.append("ingredients", JSON.stringify(recipeData.ingredients.split(",")))
      formData.append("instructions", recipeData.instructions)
      formData.append("coverimage", recipeData.coverimage) 

      

      try {
    await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
        headers: {
            authorization: 'Bearer ' + localStorage.getItem("token")
        }
    })
    navigate("/")
} catch (err) {
    console.log("ERROR:", err.response || err.message)
}   

        
    }
  return (
     <>
            <div className='container'>
                <form className='form' onSubmit={onHandleSubmit}>
                    <div className='form-control'>
                        <label>Title</label>
                        <input type="text" className='input' name="title" onChange={onHandleChange} value={recipeData.title}></input>
                    </div>
                    <div className='form-control'>
                        <label>Time</label>
                        <input type="text" className='input' name="time" onChange={onHandleChange} value={recipeData.time}></input>
                    </div>
                    <div className='form-control'>
                        <label>Ingredients</label>
                        <textarea type="text" className='input-textarea' name="ingredients" rows="5" onChange={onHandleChange} value={recipeData.ingredients}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Instructions</label>
                        <textarea type="text" className='input-textarea' name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions}></textarea>
                    </div>
                    <div className='form-control'>
                        <label>Recipe Image</label>
                        <input type="file" className='input' name="coverimage" onChange={onHandleChange}></input>
                    </div>
                    <button type="submit">Edit Recipe</button>
                </form>
            </div>
        </>
  )
}
