//./components/recipeItems.jsx

import React, { useState } from 'react' 
import axios from "axios"
import { Link } from 'react-router-dom'
import { TiStopwatch } from "react-icons/ti";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function RecipeItems({ recipes }) {

  let path = window.location.pathname === "/myRecipe"

  const [favItems, setFavItems] = useState(
    JSON.parse(localStorage.getItem("fav")) ?? []
  )

  
  const favRecipe = (item) => {
    let updatedFav;

   
    const exists = favItems.some(r => r._id === item._id)

    if (exists) {
      
      updatedFav = favItems.filter(r => r._id !== item._id)
    } else {
      
      updatedFav = [...favItems, item]
    }

    setFavItems(updatedFav)
    localStorage.setItem("fav", JSON.stringify(updatedFav))
  }

  
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipe/${id}`)

      
      const updatedFav = favItems.filter(item => item._id !== id)
      localStorage.setItem("fav", JSON.stringify(updatedFav))
      setFavItems(updatedFav)

      
      window.location.reload()

    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='card-container'>
      {
        recipes?.map((item, index) => {
          const isFav = favItems.some(res => res._id === item._id)

          return (
            <div key={index} className='card'>
               {/* <img
                src={`http://localhost:5000/images/${item.coverimage}`}
                width="120"
                height="100"
                alt="recipe"
              />  */}
        <Link to={`/recipe/${item._id}`}>
           <img
             src={`http://localhost:5000/images/${item.coverimage}`}
             width="120"
             height="100"
             alt="recipe"
             style={{ cursor: "pointer" }}
           />
        </Link>
    
              <div className='card-body'>
                <div className='title'>{item.title}</div>

                <div className='icons'>
                  <div className='timer'>
                    <TiStopwatch /> {item.time}
                  </div>

                
                  {
                    (!path) ?
                      <FaHeart
                        onClick={() => favRecipe(item)}
                        style={{
                          color: isFav ? "red" : "gray",
                          cursor: "pointer"
                        }}
                      />
                      :
                      
                      <div className='action'>
                        <Link to={`/editRecipe/${item._id}`} className="editIcon">
                          <FaEdit />
                        </Link>

                        <MdDelete
                          onClick={() => onDelete(item._id)}
                          className='deleteIcon'
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                  }

                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}









