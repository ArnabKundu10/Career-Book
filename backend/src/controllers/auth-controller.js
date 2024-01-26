// home page
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DreamCollection = require("../model/scema");
const home = async (req, res) => {
  try {
    res.send("i am home page");
  } catch (error) {
    res.send({ msg: "there is an error" });
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await DreamCollection.findOne({ email: email });
    if (findUser) {
      const passwordHash = await bcryptjs.hash(password, 10);
      const passwordMatch = await bcryptjs.compare(password, passwordHash);
      const token = await findUser.generateAuthToken();
      console.log(`my token is ${token}`);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 600000),
        httpOnly: true,
      });
      if (passwordMatch) {
        res.status(201).send({
          msg: "Registration Successful",
          token: `${token}`,
          userId: findUser._id,
        });
      } else {
        res.send("error in password");
      }
    } else {
      res.send("error in details");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const register = async (req, res) => {
  try {
    const newdata = new DreamCollection({
      fullname: req.body.fullname,
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmpassword,
      goaltasks: [
        {
          title: `${req.body.fullname} The Warrior`,
          description: "this is just prechecking before implementing it",
        },
      ],
    });
    console.log(newdata);
    if (req.body.password === req.body.confirmpassword) {
      newdata.confirmPassword = undefined;
      const token = await newdata.generateAuthToken();
      console.log(`my token is${token}`);
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 6000000),
        httpOnly: true,
      });
      const registerData = await newdata.save();
      console.log(registerData);
      res.status(201).send({
        msg: "Registration Successful",
        token: `${token}`,
        userId: newdata._id.toString(),
      });
    } else {
      res.status(400).send("passwords are not matched");
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
const goaldata = async (req, res) => {
  try {
    const _id = req.params.id;
    console.log(_id);
    const findUserData = await DreamCollection.findById(_id);
    console.log(findUserData);
    res.status(202).send(findUserData);
  } catch (err) {
    console.log(err);
    res.send("no item available", err);
  }
};
module.exports = { home, login, register, goaldata };
