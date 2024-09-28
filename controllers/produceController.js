const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const getCurrentYear = require("../utilis/year");
const NotFoundError = require("../utilis/errorhandling/errors/NotFoundError");

const currentYear = getCurrentYear();

const getAllProduce = asyncHandler(async (req, res) => {
  const [farmProduce, categories] = await Promise.all([
    await db.getAllProduce(),
    await db.getCategories(),
  ]);

  if (!farmProduce || !categories) {
    throw new NotFoundError("Not Found!");
  }
  res.render("index", {
    year: currentYear,
    categories: categories,
    produce: farmProduce,
  });
});

const getNewItemForm = asyncHandler(async (req, res) => {
  const [categories, landSizes] = await Promise.all([
    await db.getCategories(),
    await db.getLandSizes(),
  ]);

  if (!categories || !landSizes) {
    throw new NotFoundError("Not found!");
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
  res.render("item", { produce: produce, year: currentYear });
});

const getUpdateForm = asyncHandler(async (req, res) => {
  const { produceId } = req.params;
  const [produce, categories, landSizes] = await Promise.all([
    db.getProduce(produceId),
    db.getCategories(),
    db.getLandSizes(),
  ]);
  if (!produce || !categories || !landSizes) {
    throw new NotFoundError("Not Found");
  }
  res.render("updateItemForm", {
    year: currentYear,
    categories: categories,
    landSizes: landSizes,
    produce,
  });
});

const validateProduceInfo = [
  body("cmName")
    .trim()
    .notEmpty()
    .withMessage("This field is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Common name must contain only alphabets.")
    .isLength({ min: 3 })
    .withMessage("Common name must be at least 3 characters long"),
  body("sciName")
    .trim()
    .notEmpty()
    .withMessage("This field is required")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Scientific name must contain only alphabets.")
    .isLength({ min: 2 })
    .withMessage("Scientific name must be at least 2 characters long"),
  body("numItems")
    .trim()
    .notEmpty()
    .withMessage("This field is required")
    .isNumeric()
    .withMessage("Input must be a number")
    .isInt({ min: 0 })
    .withMessage("Number cannot be less than 0")
    .escape(),
  body("price")
    .trim()
    .notEmpty()
    .withMessage("This field is required")
    .isNumeric()
    .withMessage("Price must be a number")
    .isFloat({ min: 1 })
    .withMessage("Price must be greater than 0")
    .escape(),
];

const createNewProduce = [
  validateProduceInfo,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const [categories, landSizes] = await Promise.all([
        await db.getCategories(),
        await db.getLandSizes(),
      ]);
      res.status(400).render("produceForm", {
        year: currentYear,
        errors: errors.array(),
        categories: categories,
        landSizes: landSizes,
      });
    }
    const { cmName, sciName, numItems, unit, price, land_size, category } =
      req.body;
    await db.insertProduceItem(cmName, sciName, numItems, unit, price);
    const produceId = await db.getProduceId(cmName);
    const landId = await db.getLandId(land_size);
    const categoryId = await db.getCategoryId(category);
    await db.insertProduceIdLandId(produceId[0].id, landId[0].id);
    await db.insertProduceIdCategoryId(produceId[0].id, categoryId[0].id);
    res.redirect("/");
  }),
];

const deleteProduce = asyncHandler(async (req, res) => {
  const { produceId } = req.params;
  await db.deleteProduceItem(produceId);
  res.redirect("/");
});

const updateProduce = [
  validateProduceInfo,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const { produceId } = req.params;
    if (!errors.isEmpty()) {
      const [produce, categories, landSizes] = await Promise.all([
        db.getCategories(),
        db.getLandSizes(),
        db.getProduce(produceId),
      ]);
      res.status(400).render("updateItemForm", {
        year: currentYear,
        errors: errors.array(),
        categories: categories,
        landSizes: landSizes,
        produce,
      });
      return;
    }
    const { cmName, sciName, numItems, price, category, land_size } = req.body;
    const [categoryId, landId] = await Promise.all([
      await db.getCategoryId(category),
      await db.getLandId(land_size),
    ]);
    await db.updateProduceItem(
      cmName,
      sciName,
      numItems,
      price,
      produceId,
      categoryId[0].id,
      landId[0].id
    );
    res.redirect("/");
  }),
];

module.exports = {
  getAllProduce,
  getNewItemForm,
  getProduceById,
  getUpdateForm,
  updateProduce,
  deleteProduce,
  createNewProduce,
};
