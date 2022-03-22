const express = require("express");
const router = express.Router();
const UserS = require('../models/UserModel')

router.get("/", (req, res) => {
    res.send("HELLO FROM CONTROLLER");
   
  });

  router.post("/register", async (req, res) => {

    try {

        const {emailS, usernameS, passwordS} = req.body

        if (!emailS || !usernameS || !passwordS)return res.send({ success: false, errorId: 1 });

        const newUser = new UserS(req.body);
        const user = await newUser.save();
        res.send({success: true, user})
    } catch (error) {
        console.log('SIGN UP ERROR: ', error.message)
    }
  })



  module.exports = router;