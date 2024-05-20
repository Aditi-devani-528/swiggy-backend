const express = require("express")
const { addProduct } = require("../controllers/Product")

const router = express.Router()

router.post("/" , addProduct)