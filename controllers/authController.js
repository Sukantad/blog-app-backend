const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  // registration part
  register: async (req, res) => {
    try {
      const { name, email, password, bio } = req.body;

      const user_email = await Users.findOne({ email:email });
      if (user_email)
        return res.status(400).send({
          message: "This email already exists, please type a unique email id.",
        });

      if (password.length < 6)
        return res
          .status(400)
          .send({ message: "Password must be at least 6 characters." });

      const passwordHashed = await bcrypt.hash(password, 12);

      const newUser = new Users({
        name,
        email,
        password: passwordHashed,
        bio,
      });

      const accessToken = createToken({ id: newUser._id });

      await newUser.save();

      res.send({
        message: "Register Success!",
        accessToken,
        Id:  newUser._id
        
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
  // *** end registration part ***

  // *** login part start ***
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email: email });

      if (!user)
        return res.status(400).send({ message: "This email does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).send({ message: "Password is incorrect." });

      const accessToken = createToken({ id: user._id });

      res.send({
        message: "Login Success!",
        accessToken,
        user: {
          ...user._doc,
          password: "",
        },
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },
};
// *** login part end ***
const createToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN);
};

module.exports = authController;
