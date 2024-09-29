const { Router } = require("express");
const produceController = require("../controllers/produceController");
const router = Router();

router.get("/form/add-new-produce", produceController.getNewItemForm);
router.post("/add-new-produce", produceController.createNewProduce);
router.post("/update/:produceId", produceController.updateProduce);
router.get("/form/update/:produceId", produceController.getUpdateForm);
router.post("/delete/:produceId", produceController.deleteProduce);
router.get("/search", produceController.getAllProduce);
router.get("/:produceId", produceController.getProduceById);

module.exports = router;
