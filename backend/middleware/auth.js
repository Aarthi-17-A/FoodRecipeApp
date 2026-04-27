//./middleware.auth.js

const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {

    console.log("VERIFY TOKEN MIDDLEWARE HIT")
    console.log("TOKEN:", req.headers.authorization)

    let token = req.headers["authorization"]

    console.log("TOKEN:", token)   

    
    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }

    try {
    
        token = token.split(" ")[1]

       
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        
        req.user = decoded

        
        console.log("USER:", decoded)

        
        next()

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" })
    }
}

module.exports = verifyToken

