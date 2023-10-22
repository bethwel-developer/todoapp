const router= require("express").Router()
const User = require("../models/usermodel")
const bcrypt = require ("bcrypt")

//register/ create a user
router.post("/register", async (req, res)=>{

  
  try {
    const {username,email,password}= req.body;
    //username
    const usernameCheck= await User.findOne({username});
    if (usernameCheck)
    return res.json({msg:"username already exists", status:false});
    
    //email
    const emailCheck= await User.findOne({email});
    if(emailCheck)
    return res.json("email already used");

    const hashedpassword= await bcrypt.hash(password,10)
    const user = await User.create({
      username,
      email,
      password:hashedpassword,
    });
  
return res.json({status:true,user})
    //

  } catch (error) {
    res.status(500).json(error.msg)
  }
})



router.post("/login", async (req, res)=>{
try {
  const {username,password}= req.body;
  const user = await User.findOne({username});

  if (!user)
  return res.json({msg:"invalid username or password", status:false})

  const validPassword= await bcrypt.compare(password, user.password);
  if(!validPassword)
  return res.json({msg:"invalid username or password", status:false})
  
return res.json({status:true, user})
  
} catch (error) {
  res.status(500).json(error.msg)
}
})

module.exports= router
