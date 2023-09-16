const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./dbConnect");
const authRouter = require("./routers/authRouter");
const dataRoute = require('./routers/dataRouter');
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
var multipart = require('connect-multiparty');
const cloudinary = require('cloudinary').v2;



dotenv.config("./.env");

const app = express();

//middlewares
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(multipart()) 
app.use(express.json()); 
app.use(morgan("common"));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:5500",
  })
);

app.use("/auth", authRouter);
app.use("/data",dataRoute);
app.get("/", (req, res) => {
  res.status(200).send(`
    <p>OK from Server. Watch the video tutorial at <a href="https://youtu.be/rOzHRlIBqgI">https://youtu.be/rOzHRlIBqgI</a></p>
  `);
});
const PORT = process.env.PORT || 4001;

dbConnect();

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
});
