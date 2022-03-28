const express = require("express");
const router = express.Router();
const User = require('../models/UserModel')

const multer = require('multer')
const uploadSimple = multer({dest: './server/uploads'})

console.log('uploadSimple is', uploadSimple)

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

//List users

router.get("/list",async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    console.log("list users error is:", error.message);
    res.send(error.message);
  }
});

//Profile

router.patch('/profile', uploadSimple.single('image'), async (req, res) => {

  try {
      
      console.log('req.body is', req.body)
      console.log('req.file is', req.file)

      const {email, username, _id} = req.body

      if (!(email || username)) return res.send({success: false, errorId: 1})

      // const foundUser = await User.findById({_id})
      // 
      // update users (field1, field2) set field1 = email and field2 = username

      req.body.image = req.file.filename

      const user = await User.findByIdAndUpdate(_id, req.body, {new: true}).select('-__v -pass')

      console.log('Profile: user is', user)

      if (!user) return res.send({success: false, errorId: 2})

      res.send({success: true, user})
  } catch (error) {
      
      console.log('Register ERROR:', error.message)
      res.send(error.message)
  }
})


  module.exports = router;