const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
  },
  likes: {
    type: [],
  },
  comments: [
    {
      owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
      text: {
        type: String,
      },
    },
  ],
  published: {
    type:Boolean,
    default:false
  },
  date: {
    type:Date,
    default: Date.now()
  }
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
