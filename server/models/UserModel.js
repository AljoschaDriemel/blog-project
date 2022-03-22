const mongoose = require("mongoose");
const { Schema } = mongoose;

const bcrypt = require("bcrypt");
const saltRounds = 10;

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

userSchema.methods.comparePassword = async (providedPass, dbPass) => {
  console.log("compare pass method: passwords are", providedPass, dbPass);

  return await bcrypt.compare(providedPass, dbPass);
};

module.exports = mongoose.model("User", userSchema);