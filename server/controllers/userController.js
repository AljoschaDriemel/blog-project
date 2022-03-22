const express = require("express");
const router = express.Router();
const User = require('../models/UserModel')

router.get("/", (req, res) => {
    res.send("HELLO FROM CONTROLLER");
   
  });

  // REGISTER

  router.post("/register", async (req, res) => {

    try {

        const {email, username, password} = req.body

        if (!email || !username || !password )return res.send({ success: false, errorId: 1 });

        const newUser = new User(req.body);
        const user = await newUser.save();
        res.send({success: true, user})
    } catch (error) {
        console.log('SIGN UP ERROR: ', error.message)
    }
  })

  // LOGIN

router.post('/login', async (req, res) => {

  try {
    console.log('login req.body: ', req.body)
    
    const { username, email, password } = req.body
    if( !(email || username) || !password) return res.send({success: false, errorId: 1})

    const user = await User.findOne({
      $or: [{ email }, { username }],       
    }).select("-__v");
    console.log("Login: user is", user);
    if (!user) return res.send({success: false}, console.log('user not found'))

    const passMatch = await user.comparePassword(password, user.password); 
    console.log(" passmatch is", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 3 }); 

    res.send({ success: true});
  } catch (error) {
    console.log('LOGIN ERROR:', error.message)
    res.send(error.message)
  }
})



  module.exports = router;