//***************************************** STATE_LESS AUTHENTICATION *************************************
require('dotenv').config()
const secretKey = process.env.SECRETKEY; // Private Key using that any one can create the token
const jwt = require("jsonwebtoken"); // used for creating the tokens

function setUser(user){
    const payload = {
        email:user.email,
        id:user._id,
        role:user.role,
    }
    const token = jwt.sign(payload,secretKey);
    return token;
}

function getUser(token){
    if(!token) 
    return null;
    
    try {
        return jwt.verify(token,secretKey);
    } catch (error) {
        return null;
    } 
}

module.exports = {
    setUser,
    getUser,
}
