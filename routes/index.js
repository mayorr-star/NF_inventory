const { Router } = require("express");
const produceController = require("../controllers/produceController");
const router = Router();

router.get("/", produceController.getAllProduce);

module.exports = router;