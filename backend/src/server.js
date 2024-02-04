const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./connection/cnct");
const mainRouter = require("./route/auth-route");
connectDB();
const PORT = process.env.PORT || 5500;
const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mainRouter);

app.listen(PORT, () => {
  console.log("listening for requests");
});
