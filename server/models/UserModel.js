const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const saltRounds = 10;

const jwt = require('jsonwebtoken')

const userSchema = new Schema({

    firstName: {type: String},
    lastName: {type: String},
    username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      age: { type: Number },
      address: { type: String },
      image: { type: String },
      token: { type: String }
})

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// COMPARE PASSWORD
userSchema.methods.comparePassword = async (providedPass, dbPass) => {
  console.log("compare pass method: passwords are", providedPass, dbPass);

  return await bcrypt.compare(providedPass, dbPass);
};

// GENERATE TOKEN
userSchema.methods.generateToken = async function() {

  const user = this;

  const token = jwt.sign(user._id.toHexString(), process.env.SECRET)
  user.token = token

  await user.save();

  return user
} 
module.exports = mongoose.model("User", userSchema);