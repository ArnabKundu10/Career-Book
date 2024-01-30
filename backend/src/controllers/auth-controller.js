// home page
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const DreamCollection = require("../model/scema");
let my_id = "null";
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
      const passwordMatch = await bcryptjs.compare(
        findUser.confirmpassword,
        passwordHash
      );
      console.log(`check ${passwordHash} compare with ${findUser.password}`);

      // console.log(`my token is ${token}`);
      // res.cookie("jwt", token, {
      //   expires: new Date(Date.now() + 600000),
      //   httpOnly: true,
      // });
      if (passwordMatch) {
        const token = await findUser.generateAuthToken();
        res.status(201).send({
          msg: "Registration Successful",
          token: `${token}`,
          userId: findUser._id,
        });
      } else {
        res.status(500).send("error in password");
      }
    } else {
      res.status(500).send("error in details");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
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
          status: "incomplete",
          title: `${req.body.fullname} The Warrior`,
          description: "this is just prechecking before implementing it",
        },
        {
          status: "complete",
          title: "The complete Warrior",
          description: "this is just prechecking before implementing it",
        },
      ],
    });
    // console.log(newdata);
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
    my_id = req.params.id;
    // console.log(_id);
    const findUserData = await DreamCollection.findById(_id);
    // console.log(findUserData);
    res.status(202).send(findUserData);
  } catch (err) {
    console.log(err);
    res.send("no item available", err);
  }
};
const todo = async (req, res) => {
  try {
    const _id = req.body.id;
    const singleTitle = req.body.title;
    const singleDescription = req.body.description;
    // console.log(_id);
    const findTaskData = await DreamCollection.findById(_id);
    // console.log(findTaskData);
    if (singleTitle !== "") {
      findTaskData.goaltasks.push({
        title: singleTitle,
        description: singleDescription,
        status: "incomplete",
      });
      const afterdata = await findTaskData.save();
      res.send(afterdata);
    } else {
      res.status(500).send("Title should not be empty");
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
const incomplete = async (req, res) => {
  try {
    const _id = req.body.mainid;
    const index = req.body.i;
    const findTaskData = await DreamCollection.findById({ _id });
    findTaskData.goaltasks[index] = {
      title: findTaskData.goaltasks[index].title,
      description: findTaskData.goaltasks[index].description,
      status: "complete",
    };
    await findTaskData.save();
    res.send(findTaskData);
  } catch (error) {
    res.status(404).send(error);
  }
};
const complete = async (req, res) => {
  try {
    const _id = req.body.mainid;
    const index = req.body.i;
    const findTaskData = await DreamCollection.findById({ _id });
    findTaskData.goaltasks[index] = {
      title: findTaskData.goaltasks[index].title,
      description: findTaskData.goaltasks[index].description,
      status: "incomplete",
    };
    await findTaskData.save();
    res.send(findTaskData);
  } catch (error) {
    res.status(404).send(error);
  }
};
const deletetask = async (req, res) => {
  try {
    const _id = req.body.mainid;
    const index = req.body.i;
    const findTaskData = await DreamCollection.findById({ _id });
    findTaskData.goaltasks.splice(index, 1);
    await findTaskData.save();
    res.send(findTaskData);
  } catch (error) {
    res.status(404).send(error);
  }
};
module.exports = {
  home,
  login,
  register,
  goaldata,
  todo,
  incomplete,
  complete,
  deletetask,
};
