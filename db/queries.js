const pool = require("./pool");

const getAllProduce = async () => {
  const { rows } = await pool.query(
    "SELECT produce.id, produce.common_name, produce.scientific_name, produce.count, produce.unit, produce.price, categories.category, landarea.area_acres FROM produce INNER JOIN produce_category ON produce.id = produce_category.produce_id INNER JOIN categories ON produce_category.category_id = categories.id INNER JOIN produce_land ON produce_land.produce_id = produce.id INNER JOIN landarea ON produce_land.land_id = landarea.id"
  );
  return rows;
};

const getCategories = async () => {
  const { rows } = await pool.query("SELECT category FROM categories");
  return rows;
};

const getLandSizes = async () => {
  const { rows } = await pool.query("SELECT area_acres FROM landarea");
  return rows;
};

const getProduceId = async (name) => {
  const { rows } = await pool.query(
    "SELECT id FROM produce WHERE common_name = $1",
    [name]
  );
  return rows;
};

const getProduce = async (produceId) => {
  const { rows } = await pool.query(
    "SELECT produce.id, produce.common_name, produce.scientific_name, produce.count, produce.unit, produce.price, categories.category, landarea.area_acres FROM produce INNER JOIN produce_category ON produce_category.produce_id = produce.id INNER JOIN categories ON produce_category.category_id = categories.id INNER JOIN produce_land ON produce.id = produce_land.produce_id INNER JOIN landarea ON landarea.id = produce_land.land_id WHERE produce.id = $1",
    [produceId]
  );
  return rows;
};

const getLandId = async (size) => {
  const { rows } = await pool.query(
    "SELECT id FROM landarea WHERE area_acres = $1",
    [size]
  );
  return rows;
};

const getCategoryId = async (category) => {
  const { rows } = await pool.query(
    "SELECT id FROM categories WHERE category = $1",
    [category]
  );
  return rows;
};

const insertProduceItem = async (
  common_name,
  scientific_name,
  count,
  unit,
  price
) => {
  await pool.query(
    "INSERT INTO produce (common_name, scientific_name, count, unit, price) VALUES ($1, $2, $3, $4, $5)",
    [common_name, scientific_name, count, unit, price]
  );
};

const insertProduceIdLandId = async (produceId, landId) => {
  await pool.query("INSERT INTO produce_land VALUES ($1, $2)", [
    produceId,
    landId,
  ]);
};

const insertProduceIdCategoryId = async (produceId, categoryId) => {
  await pool.query("INSERT INTO produce_category VALUES ($1, $2)", [
    produceId,
    categoryId,
  ]);
};

const deleteProduceItem = async (produceId) => {
  await pool.query("DELETE FROM ONLY produce WHERE id = $1", [produceId]);
};

const updateProduceItem = async (
  cmName,
  sciName,
  count,
  price,
  produceId,
  categoryId,
  landId
) => {
  await Promise.all([
    pool.query(
      "UPDATE produce SET common_name = $1, scientific_name = $2, count = $3, price = $4  WHERE id = $5",
      [cmName, sciName, count, price, produceId]
    ),
    pool.query(
      "UPDATE produce_category SET category_id = $1 WHERE produce_id = $2",
      [categoryId, produceId]
    ),
    pool.query("UPDATE produce_land SET land_id = $1 WHERE produce_id = $2", [landId, produceId])
  ]);
};

module.exports = {
  getAllProduce,
  getCategories,
  getLandSizes,
  getLandId,
  getProduceId,
  getCategoryId,
  getProduce,
  insertProduceIdLandId,
  insertProduceIdCategoryId,
  insertProduceItem,
  deleteProduceItem,
  updateProduceItem,
};
