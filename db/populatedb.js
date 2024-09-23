const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS produce (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, common_name VARCHAR(255),
    scientific_name VARCHAR(255), count INTEGER, unit VARCHAR(25) DEFAULT 'bags');

    CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category VARCHAR(25));

    CREATE TABLE IF NOT EXISTS landarea (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, area_acres NUMERIC(6, 2));

    CREATE TABLE IF NOT EXISTS produce_category (produce_id INTEGER , category_id INTEGER);

    CREATE TABLE IF NOT EXISTS produce_land (produce_id INTEGER , land_id INTEGER);

    INSERT INTO produce (common_name, scientific_name, count) VALUES 
    ('Cabbage', 'Brassica oleracea', 3500),
    ('Tomato', 'Solanum lycopersicum', 5480),
    ('Carrot', 'Daucus carota', 559),
    ('Mango', 'Manifera indica', 3200),
    ('Orange', 'Citrus x sinensis', 5000),
    ('African pear', 'Dacryodes edulis', 687),
    ('Turkey', 'Meleagris gallopavo', 345),
    ('Lettuce', 'Lactuca sativa', 899),
    ('Spinach', 'Spinacia oleracea', 700),
    ('Cow', 'Bos tauras', 75),
    ('Goat', 'Capra aegagrus hircus', 233),
    ('Guinea fowl', 'Numida meleagris', 785),
    ('Pig', 'Sus scrofa domesticus', 357),
    ('Beans', 'Phaseolus vulgaris', 3478),
    ('Groundnut', 'Arachis hypogaea', 12005),
    ('Coconut', 'Cocos nucifera', 500),
    ('Pepper', 'Capsicum annuum', 12045),
    ('Garden egg', 'Solanum melongena', 478),
    ('Onion', 'Allium cepa', 700),
    ('Garlic', 'Alium sativum', 720),
    ('Watermelon', 'Cirullus lanatus', 568),
    ('Pineapple', 'Ananas comosus', 869),
    ('Cowpea', 'Vigna unguiculata', 345),
    ('Apple', 'Malus pumila', 2500),
    ('Guava', 'Psidium guajava', 457),
    ('Asparagus', 'Asparagus officinalis', 236),
    ('Grape', 'Vitis vinifera', 500);

    INSERT INTO categories (category) VALUES 
    ('Vegetable'),
    ('Fruit'),
    ('Poultry'),
    ('Livestock'),
    ('Legume');

    INSERT INTO landarea (area_acres) VALUES 
    (3),
    (1);

    INSERT INTO produce_land VALUES 
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 1),
    (6, 1),
    (7, 2),
    (8, 1),
    (9, 1),
    (10, 2),
    (11, 2),
    (12, 2),
    (13, 2),
    (14, 1),
    (15, 1),
    (16, 1),
    (17, 1),
    (18, 1),
    (19, 1),
    (20, 1),
    (21, 1),
    (22, 1),
    (23, 1),
    (24, 1),
    (25, 1),
    (26, 1),
    (27, 1);

    INSERT INTO produce_category VALUES  
    (1, 1),
    (2, 2),
    (3, 1),
    (4, 2),
    (5, 2),
    (6, 2),
    (7, 3),
    (8, 1),
    (9, 1),
    (10, 4),
    (11, 4),
    (12, 3),
    (13, 4),
    (14, 5),
    (15, 5),
    (16, 2),
    (17, 2),
    (18, 2),
    (19, 1),
    (20, 1),
    (21, 2),
    (22, 2),
    (23, 5),
    (24, 2),
    (25, 2),
    (26, 1),
    (27, 2);
`;


async function main() {
    console.log('seeding...')
    const client = new Client({
        connectionString: "postgresql://nana:nana@12@localhost:5432/nanafarms"
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done')
}

main();