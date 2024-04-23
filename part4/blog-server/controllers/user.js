const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (password.length < 3 || username.length < 3) {
    res.status(401).json({
      error:
        "Invalid Authentication: Username or Password Must be at least 3 Characters",
    });
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs")
  res.json(users);
});

module.exports = userRouter;
