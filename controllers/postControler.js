const PostModel = require("../models/postModel");
const Users = require("../models/userModel");

require("dotenv").config();
const newPost = async (req, res) => {
  try {
    const { content, user_id, image } = req.body;
    let temp = await Users.find({ _id: user_id });
    let author = temp[0].name;
    console.log(author);
    const new_Post = new PostModel({
      user_id,
      content,
      image,
      author,
    });

    await new_Post.save();

    res.send({
      message: "Post created ",
      post: new_Post,
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const getSinglePost = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await PostModel.findById({ _id: id });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    return res.status(200).send({ post });
  } catch (error) {
    console.log(error, "error while fetching single post");
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { content, image } = req.body;
  try {
    let post = await PostModel.findByIdAndUpdate(
      id,
      { content, image },
      { new: true }
    );
    if (!post) {
      return res.status(404).send({ message: "post not found" });
    }
    return res.status(200).send({ post });
  } catch (error) {
    console.log(error, "error while  updating post");
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await PostModel.findOneAndDelete({ _id: id });
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    return res.status(200).send({ message: "Post deleted successfully" });
  } catch (error) {
    console.log(error, "error while deleting the post");
  }
};
const mostLikedpost = async (req, res) => {
  try {
    const LikedPosts = await PostModel.find()
      .sort({ likes: "desc" })
      .limit(5)
      .populate("user_id");
    return res.status(200).send({ LikedPosts });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const getAllPost = async (req, res) => {
  try {
    let post = await PostModel.find();
    if (!post) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(200).send({ post });
  } catch (error) {
    console.log(error, "error while  find all  post");
  }
};

const likePostById = async (req, res) => {
  const { id } = req.params;
  try {
    let post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }

    let likedPost = await PostModel.findByIdAndUpdate(id, {
      likes: post.likes + 1,
    });
    return res
      .status(200)
      .send({ message: "You have liked a post", likedPost });
  } catch (error) {
    res.status(500).send(error);
  }
};

const unLikePostById = async (req, res) => {
  let { id } = req.params;
  try {
    let post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    if (post.likes > 0) {
      let likedPost = await PostModel.findByIdAndUpdate(id, {
        likes: post.likes - 1,
      });
    }

    return res.status(200).send({ message: "You have disliked" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getSinglePost,
  updatePost,
  deletePost,
  getAllPost,
  newPost,
  likePostById,
  unLikePostById,
  mostLikedpost,
};
