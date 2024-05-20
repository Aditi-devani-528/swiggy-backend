const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const productModel = require("./model/add-product");
const mongoose = require("mongoose");
var cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
const PORT = 8000;

app.use(express.static(path.resolve('upload')))


// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/swiggy")
  .then(() => {
    console.log("MongoDB connected...");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello, Swiggy!");
});

app.post("/add-product", upload.single("productImg"), async (req, res) => {
  console.log(req.body);
  const productImg = "http://localhost:8000/image/" + req.file.filename;
  const createdProduct = await productModel.create({ ...req.body, productImg});
  return res.send(createdProduct);
});

app.get("/all-product", async (req, res) => {
  const product = await productModel.find({});
  console.log(product);
  return res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
