const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user"},
    
    content: {
      type:String,
      required:true,
      maxlength:300
    },
    image: {
      type: String,
    },
    likes: {
      type:Number,
      default:0,
      min:0
    },
    author:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);
const PostModel = mongoose.model("post",postSchema);
module.exports = PostModel
