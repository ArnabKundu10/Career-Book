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
    });
    console.log(newdata);

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
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
module.exports = { home, login, register };
