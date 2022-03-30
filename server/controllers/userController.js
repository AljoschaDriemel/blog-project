const express = require("express");
const router = express.Router();
const User = require("../models/UserModel");

const multer = require("multer");
const uploadSimple = multer({ dest: "./server/uploads" });

console.log("uploadSimple is", uploadSimple);

router.get("/", (req, res) => {
  res.send("HELLO FROM CONTROLLER");
});

//EMAIL
const sendEmail = require("../utils/mail/mail");
const sendEmailResetPass = require("../utils/mail/mailResetPass");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.send({ success: false, errorId: 1 });

    const newUser = new User(req.body);
    const user = await newUser.save();

    //token
    const token = await user.generateToken("1d");

    // send an email to the user that just registred
    sendEmail(user.email, token);
    console.log("user: ", user);

    res.send({ success: true, user });
  } catch (error) {
    console.log("SIGN UP ERROR: ", error.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("login req.body: ", req.body);

    const { username, email, password } = req.body;
    if (!(email || username) || !password)
      return res.send({ success: false, errorId: 1 });

    let user = await User.findOne({
      $or: [{ email }, { username }],
    }).select("-__v");
    console.log("Login: user is", user);
    if (!user)
      return res.send({ success: false }, console.log("user not found"));

    const passMatch = await user.comparePassword(password, user.password);
    console.log(" passmatch is", passMatch);

    if (!passMatch) return res.send({ success: false, errorId: 3 });

    const token = await user.generateToken("1d");

    user = user.toObject();
    delete user.pass;
    delete user.token;

    res
      .cookie("cookieCMSBLOG", token)
      .send({ success: true, user });
  } catch (error) {
    console.log("LOGIN ERROR:", error.message);
    res.send(error.message);
  }
});

//List users
router.get("/list", async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    console.log("list users error is:", error.message);
    res.send(error.message);
  }
});

//Profile
router.patch("/profile", uploadSimple.single("image"), async (req, res) => {
  try {
    console.log("req.body is", req.body);
    console.log("req.file is", req.file);

    const { email, username, _id } = req.body;

    if (!(email || username)) return res.send({ success: false, errorId: 1 });

    // const foundUser = await User.findById({_id})
    //
    // update users (field1, field2) set field1 = email and field2 = username

    req.body.image = req.file.filename;

    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select("-__v -pass");

    console.log("Profile: user is", user);

    if (!user) return res.send({ success: false, errorId: 2 });

    res.send({ success: true, user });
  } catch (error) {
    console.log("Register ERROR:", error.message);
    res.send(error.message);
  }
});

// LOGOUT
router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("cookieCMSBLOG").send({ success: true });
    console.log("logout: user logged out");
  } catch (error) {
    console.log("Logout ERROR:", error.message);
    res.send(error.message);
  }
});

// EMAIL CONFIRM
router.get("/emailconfirm/:token", async (req, res) => {
  try {
    const token = req.params.token;
    console.log("token is:", token);

    // find the user with provided id (id is contained inside JWT)
    // update the user and set emailverified to true

    const payload = await User.getPayload(token);
    const id = payload.id;

    const updatedUser = User.findByIdAndUpdate(id, { emailVerified: true });

    if (!updatedUser) return res.send();

    res.send({ success: true });
  } catch (error) {
    console.log("Email Confirm ERROR:", error.message);
    res.send(error.message);
  }
});

//forgot pass
router.post("/forgotpass", async (req, res) => {
  try {
    const email = req.body.email;
    console.log("email is", email);

    // find user in db
    const user = await User.findOne({ email: email });
    console.log("user is", user);

    if (!user) return send({ success: false, errorId: 1 });

    const userWithToken = await user.generateToken("1d", "resetToken");

    console.log("token is ", userWithToken.resetToken);

    if (!userWithToken.resetToken) return send({ success: false, errorId: 2 });

    sendEmailResetPass(user.email, userWithToken.resetToken);

    res.send({ success: true });
  } catch (error) {
    console.log("forgot pass ERROR:", error.message);
    res.send(error.message);
  }
});

//change pass
router.post("/changepass", async (req, res) => {
  try {
    const { pass, token } = req.body;

    console.log("body is", req.body);

    // 1. verify the token
    const verifiedToken = await User.getPayload(token);

    console.log("verified token is", verifiedToken);

    const user = await User.findByIdAndUpdate(verifiedToken.id);

    if (user) {
      user.password = pass;
      user.resetToken = "";

      const userSaved = await user.save();
      console.log("user is ", userSaved);
    }

    res.send({ success: true });
  } catch (error) {
    console.log("change pass ERROR:", error.message);
    res.send(error.message);
  }
});

module.exports = router;
