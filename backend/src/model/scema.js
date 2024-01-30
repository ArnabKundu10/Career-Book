const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { default: isEmail } = require("validator/lib/isEmail");

mongoose.set("bufferCommands", true);

const dreamLogin = new mongoose.Schema({
  fullname: {
    type: String,
    uppercase: true,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: [true, "its not unique"],
    validate(val) {
      if (!isEmail(val)) {
        throw new Error("incorrect email");
      }
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
    required: true,
  },
  goaltasks: [
    {
      status: {
        type: String,
      },
      title: {
        type: String,

        uppercase: true,
      },
      description: {
        type: String,
        lowercase: true,
      },
    },
  ],
});
dreamLogin.methods.generateAuthToken = async function () {
  try {
    console.log(this._id);
    const myToken = await jwt.sign(
      { _id: this._id.toString() },
      "thisismyfirstauthenticationtokenhgfhgdhdhowisit"
    );
    return myToken;
  } catch (error) {
    console.log(error);
  }
};
dreamLogin.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  console.log(`new password is ${this.password}`);
  next();
});
const DreamCollection = new mongoose.model("DreamCollection", dreamLogin);
module.exports = DreamCollection;
