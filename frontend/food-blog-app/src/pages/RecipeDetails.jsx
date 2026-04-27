import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function RecipeDetails() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/recipe/${id}`)
        console.log("DATA:", res.data) // ✅ debug
        setRecipe(res.data)
      } catch (err) {
        console.log("ERROR:", err)
      }
    }

    fetchRecipe()
  }, [id])

  // ✅ Prevent crash
  if (!recipe) {
    return <h2 style={{ marginTop: "100px", textAlign: "center" }}>Loading...</h2>
  }

  return (
    <div className="recipe-page">

    <h2 className="recipe-title">{recipe.title}</h2>

    <div className="recipe-layout">

      <div className="recipe-image">
        <img
          src={`http://localhost:5000/images/${recipe.coverimage}`}
          alt="recipe"
        />
      </div>

      <div className="recipe-details">

        <p className="recipe-time">
          <b>Time:</b> {recipe.time}
        </p>

        <h3>Ingredients:</h3>
        <ul>
          {Array.isArray(recipe.ingredients) &&
            recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
        </ul>

        <h3>Instructions:</h3>
        <p className="recipe-instructions">
          {recipe.instructions}
        </p>

      </div>

    </div>
  </div>
  )
}