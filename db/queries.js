const pool = require("pool");

const fecthAllProduce = async () => {
  const { rows } = await pool.query(
    "SELECT produce.common_name, produce.scientific_name, produce.count, produce.unit, categories.category, land_area.area FROM NanaFarms INNER JOIN produce_category ON produce.id = produce_category.produce_id INNER JOIN categories ON produce_category.category_id = category.id INNER JOIN produce_land ON produce_land.produce_id = produce.id INNER JOIN land_area ON produce_land.land_id = land_area.id"
  );
  return rows;
};

const insertNewProduce = async () => {
  await pool.query("INSERT INTO produce (common_name scientific_name, count, unit) VALUES ($1, $2, $3, $4) ");
};
