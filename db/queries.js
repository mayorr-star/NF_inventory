const pool = require("./pool");

const fecthAllProduce = async () => {
  const { rows } = await pool.query(
    "SELECT produce.common_name, produce.scientific_name, produce.count, produce.unit, categories.category, landarea.area_acres FROM produce INNER JOIN produce_category ON produce.id = produce_category.produce_id INNER JOIN categories ON produce_category.category_id = categories.id INNER JOIN produce_land ON produce_land.produce_id = produce.id INNER JOIN landarea ON produce_land.land_id = landarea.id"
  );
  return rows;
};
const getCategories = async () => {
  const { rows } = await pool.query("SELECT category FROM categories");
  return rows;
}

const insertProduceItem = async (
  common_name,
  scientific_name,
  count,
  unit,
  price
) => {
  await pool.query(
    "INSERT INTO produce (common_name scientific_name, count, unit) VALUES ($1, $2, $3, $4, $5)",
    [common_name, scientific_name, count, unit, price]
  );
};

const insertLandArea = async (landArea) => {
  await pool.query("INSERT INTO land (area) VALUES ($1)", [landArea]);
};

const deleteProduceItem = async (produceId) => {
  await pool.query("SELECT * FROM produce WHERE id = $1", [produceId]);
};

const updateProduceItem = async (produceId) => {
  await pool.query("SELECT * produce  WHERE id = $1", [produceId]);
};

module.exports = {
  fecthAllProduce,
  insertLandArea,
  insertProduceItem,
  deleteProduceItem,
  updateProduceItem,
  getCategories
};
