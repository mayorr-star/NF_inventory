const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const getCurrentYear = require("../utilis/year");
const NotFoundError = require("../utilis/errorhandling/errors/NotFoundError");
const { body, validationResult } = require("express-validator");

const currentYear = getCurrentYear();

const getCategories = asyncHandler(async (req, res) => {
  const categories = await db.getCategories();
  if (!categories) {
    throw new NotFoundError("Not Found!");
  }
  res.render("categories", {
    categories: categories,
    year: currentYear,
  });
});

const getCategoryForm = (req, res) => {
  res.render("categoryForm");
};

const validateCategory = [
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isAlpha()
    .withMessage("Category must contain only alphabets")
    .isLength({ min: 2 })
    .withMessage("Category must be at least 2 charatcers long"),
];

const createCategory = [validateCategory, asyncHandler(async (req, res) => {
  const { category } = req.body;
  const errors = validationResult(req);
  await db.insertCategory(category);
})];

module.exports = { getCategories, getCategoryForm, createCategory };
