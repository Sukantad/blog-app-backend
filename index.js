const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const authRouter = require("./routers/authRouter");
const usersRouter = require("./routers/userRouter");
const postRouter = require("./routers/postRouter");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/", authRouter);
app.use("/", usersRouter);
app.use("/",postRouter)
const port = process.env.PORT || 4000;
app.listen(port, () => {
  connection();
  console.log("Server is running on port", port);
});
