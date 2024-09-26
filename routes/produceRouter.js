const { Router } = require("express");
const produceController = require("../controllers/produceController");
const router = Router();

router.get("/add-new-produce", produceController.getNewItemForm);
router.post("/add-new-produce", produceController.createNewProduce);
router.post("/delete/:produceId", produceController.deleteProduce);
router.get("/update/:produceId", produceController.updateProduce);
router.get("/:produceId", produceController.getProduceById);

module.exports = router;
