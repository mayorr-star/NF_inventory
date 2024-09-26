const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const getCurrentYear = require("../utilis/year");
const NotFoundError = require("../utilis/errorhandling/errors/NotFoundError");

const currentYear = getCurrentYear();

const getAllProduce = asyncHandler(async (req, res) => {
  const farmProduce = await db.getAllProduce();
  const categories = await db.getCategories();

  if (!farmProduce) {
    throw new NotFoundError("Farm produce not found!");
  } else if (!categories) {
    throw new NotFoundError("Categories not found!");
  }
  res.render("index", {
    year: currentYear,
    categories: categories,
    produce: farmProduce,
  });
});

const getNewItemForm = asyncHandler(async (req, res) => {
  const categories = await db.getCategories();
  const landSizes = await db.getLandSizes();
  if (!categories) {
    throw new NotFoundError("Form not found!");
  } else if (!landSizes) {
    throw new NotFoundError("Land sizes not found!");
  }
    res.render("produceForm", {
      year: currentYear,
      categories: categories,
      landSizes: landSizes,
    });
});

const getProduceById = asyncHandler(async (req, res) => {
  const { produceId } = req.params;
  const data = await db.getProduce(produceId);
  const produce = Object.assign({}, ...data);
  res.render("item", {produce: produce, year: currentYear});
});

const createNewProduce = asyncHandler(async (req, res) => {
  const { cmName, sciName, numItems, unit, price, land_size, category } =
    req.body;
  await db.insertProduceItem(cmName, sciName, numItems, unit, price);
  const produceId = await db.getProduceId(cmName);
  const landId = await db.getLandId(land_size);
  const categoryId = await db.getCategoryId(category);
  await db.insertProduceIdLandId(produceId[0].id, landId[0].id);
  await db.insertProduceIdCategoryId(produceId[0].id, categoryId[0].id);
  res.redirect("/");
});

const deleteProduce = asyncHandler(async (req, res) => {
  const { produceId } = req.params;
  await db.deleteProduceItem(produceId);
  res.redirect("/");
});

const updateProduce = asyncHandler(async (req, res) => {
  const { produceId } = req.params;
  await db.updateProduceItem(produceId);
  res.redirect("/");
  console.log("produce updated");
});

module.exports = {
  getAllProduce,
  getNewItemForm,
  getProduceById,
  updateProduce,
  deleteProduce,
  createNewProduce,
};
