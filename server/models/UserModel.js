const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({

    firstNameS: {type: String},
    lastNameS: {type: String},
    usernameS: {
        type: String,
        required: true,
        unique: true,
      },
      emailS: {
        type: String,
        required: true,
        unique: true,
      },
      passwordS: {
        type: String,
        required: true,
      },
      ageS: { type: Number },
      addressS: { type: String },
      imageS: { type: String },
})

module.exports = mongoose.model("UserS", userSchema);