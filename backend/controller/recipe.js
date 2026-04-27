// ./controller/recipe.js
const Recipes = require("../models/recipe")
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

const getRecipes = async(req, res) => {
   const recipes = await Recipes.find()
   return res.json(recipes)
};

const getRecipe = async (req, res) => {
    try {
        console.log("ID RECEIVED:", req.params.id) 

        const recipe = await Recipes.findById(req.params.id)

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" })
        }

        res.json(recipe)

    } catch (err) {
        console.log("ERROR IN getRecipe:", err) 
        res.status(500).json({ message: "Server error" })
    }
}


const addRecipe = async (req, res) => {
    try {
        console.log("AUTH HEADER:", req.headers.authorization)
        console.log("USER:", req.user)
        console.log("EMAIL:", req.user.email)       
        console.log("USER ID:", req.user.id)        

        console.log("CREATED BY:", req.user.id)


        const { title, instructions, time } = req.body

        
        const ingredients = JSON.parse(req.body.ingredients)

        
        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "Required fields can't be empty" })
        }

        const newRecipe = await Recipes.create({
            title,
            ingredients,
            instructions,
            time,
            coverimage: req.file ? req.file.filename : "",
            createdBy:req.user.id
        })

        return res.json(newRecipe)

    } catch (err) {
        console.log(err) 
        return res.status(500).json({ message: "Server error" })
    }
};


const editRecipe = async(req, res) => {
    const {title,ingredients,instructions,time}=req.body
    let recipe = await Recipes.findById(req.params.id)
    try{
        if(recipe){
           let coverimage = req.file ? req.file.filename : recipe.coverimage;
            await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverimage},{new:true})
            res.json({title,ingredients,instructions,time})
        }
    }
    catch(err){
        return res.status(404).json({message:"error"})
    }
    
};


const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id);

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }

        await Recipes.findByIdAndDelete(req.params.id);

        res.json({ message: "Recipe deleted successfully" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload};