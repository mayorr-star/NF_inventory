const { Router } = require("express");
const produceController = require("../controllers/produceController");
const router = Router();

router.get("/", produceController.getAllProduce);
router.post("/add-new-produce", produceController.createNewProduce);
router.get("/delete/produce/:produceId", produceController.deleteProduce);
router.get("/update/produce/:produceId", produceController.updateProduce);

module.exports = router;
