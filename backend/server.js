// server.js
const express=require("express")
const app=express()
const dotenv=require("dotenv").config()
const connectDB = require("./config/connectiondb")
const cors=require("cors")


const PORT=process.env.PORT || 3000
connectDB()

app.use(express.json());
app.use(cors())
app.use("/images", express.static("public/images"))


app.use("/",require("./routes/user"))
app.use("/recipe", require("./routes/recipe"))

app.listen(PORT,(err)=>{
    console.log(`app is listening on port ${PORT}`)
})


// [
//   {
//     "title": "Chicken Biryani",
//     "ingredients": ["Chicken", "Rice", "Onion", "Spices", "Yogurt"],
//     "instructions": "Cook rice separately. Fry onions and chicken with spices. Mix with rice and cook on low heat.",
//     "time": "45 mins"
//   },
//   {
//     "title": "Veg Fried Rice",
//     "ingredients": ["Rice", "Carrot", "Beans", "Capsicum", "Soy sauce"],
//     "instructions": "Cook rice. Stir fry vegetables. Add rice and soy sauce. Mix well.",
//     "time": "20 mins"
//   },
//   {
//     "title": "Masala Dosa",
//     "ingredients": ["Dosa batter", "Potato", "Onion", "Mustard seeds"],
//     "instructions": "Prepare dosa on pan. Cook potato filling. Place inside dosa and fold.",
//     "time": "30 mins"
//   },
//   {
//     "title": "Paneer Butter Masala",
//     "ingredients": ["Paneer", "Tomato", "Butter", "Cream", "Spices"],
//     "instructions": "Cook tomato gravy. Add spices, butter, and cream. Add paneer cubes and simmer.",
//     "time": "25 mins"
//   },
//   {
//     "title": "Egg Curry",
//     "ingredients": ["Eggs", "Onion", "Tomato", "Spices"],
//     "instructions": "Boil eggs. Prepare curry with onion and tomato. Add eggs and cook.",
//     "time": "30 mins"
//   },
//   {
//     "title": "Chicken Curry",
//     "ingredients": ["Chicken", "Onion", "Tomato", "Spices"],
//     "instructions": "Cook onions and tomatoes. Add chicken and spices. Cook until done.",
//     "time": "35 mins"
//   },
//   {
//     "title": "Vegetable Upma",
//     "ingredients": ["Rava", "Carrot", "Beans", "Onion", "Mustard seeds"],
//     "instructions": "Roast rava. Cook vegetables. Add water and rava. Stir until thick.",
//     "time": "15 mins"
//   },
//   {
//     "title": "Pasta",
//     "ingredients": ["Pasta", "Tomato sauce", "Garlic", "Olive oil"],
//     "instructions": "Boil pasta. Prepare sauce with garlic and tomato. Mix together.",
//     "time": "25 mins"
//   },
//   {
//     "title": "Grilled Sandwich",
//     "ingredients": ["Bread", "Butter", "Vegetables", "Cheese"],
//     "instructions": "Place vegetables and cheese between bread slices. Grill until golden.",
//     "time": "10 mins"
//   },
//   {
//     "title": "Dal Tadka",
//     "ingredients": ["Toor dal", "Onion", "Tomato", "Garlic", "Spices"],
//     "instructions": "Cook dal. Prepare tadka with spices and garlic. Mix with dal.",
//     "time": "25 mins"
//   }
// ]