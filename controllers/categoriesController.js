const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const getCurrentYear = require("../utilis/year");
const NotFoundError = require("../utilis/errorhandling/errors/NotFoundError");

const currentYear = getCurrentYear();

const getCategories = asyncHandler(async (req, res) => {
  const categories = await db.getCategories();
  console.log(categories)
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
}

module.exports = { getCategories, getCategoryForm };
