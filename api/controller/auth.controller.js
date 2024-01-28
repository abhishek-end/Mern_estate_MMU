import User from "../models/user.model.js"

export const signup = async (req,res,next) => {
   const {username, email, password} = req.body
   const newUser = new User({username ,email, password}) 
   try {
    await newUser.save()
    res.status(500).json('User Created Successully')
   } catch(error)  {
    next(error)
   }
}
 