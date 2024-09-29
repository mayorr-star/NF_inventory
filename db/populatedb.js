#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
    CREATE TABLE IF NOT EXISTS produce (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, common_name VARCHAR(255),
    scientific_name VARCHAR(255), count INTEGER, unit VARCHAR(25) DEFAULT 'bags', price REAL);

    CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, category VARCHAR(25));

    CREATE TABLE IF NOT EXISTS landarea (id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY, area_acres REAL);

    CREATE TABLE IF NOT EXISTS produce_category (produce_id INTEGER , category_id INTEGER);

    CREATE TABLE IF NOT EXISTS produce_land (produce_id INTEGER , land_id INTEGER);

    INSERT INTO produce (common_name, scientific_name, count, price) VALUES 
    ('Cabbage', 'Brassica oleracea', 3500, 12.50),
    ('Tomato', 'Solanum lycopersicum', 5480, 15.30),
    ('Carrot', 'Daucus carota', 559, 17.00),
    ('Mango', 'Manifera indica', 3200, 6.10),
    ('Orange', 'Citrus x sinensis', 5000, 6.20),
    ('African pear', 'Dacryodes edulis', 687, 21.00),
    ('Turkey', 'Meleagris gallopavo', 345, 250.21),
    ('Lettuce', 'Lactuca sativa', 899, 13.00),
    ('Spinach', 'Spinacia oleracea', 700, 11.00),
    ('Cow', 'Bos tauras', 75, 300),
    ('Goat', 'Capra aegagrus hircus', 233, 250.10),
    ('Guinea fowl', 'Numida meleagris', 785, 173.24),
    ('Pig', 'Sus scrofa domesticus', 357, 259.13),
    ('Beans', 'Phaseolus vulgaris', 3478, 16.00),
    ('Groundnut', 'Arachis hypogaea', 12005, 7.00),
    ('Coconut', 'Cocos nucifera', 500, 15.00),
    ('Pepper', 'Capsicum annuum', 12045, 6.00),
    ('Garden egg', 'Solanum melongena', 478, 13.21),
    ('Onion', 'Allium cepa', 700, 5.00),
    ('Garlic', 'Alium sativum', 720, 5.00),
    ('Watermelon', 'Cirullus lanatus', 568, 16.00),
    ('Pineapple', 'Ananas comosus', 869, 14.32),
    ('Cowpea', 'Vigna unguiculata', 345, 12.12),
    ('Apple', 'Malus pumila', 2500, 6.00),
    ('Guava', 'Psidium guajava', 457, 7.00),
    ('Asparagus', 'Asparagus officinalis', 236, 8.00),
    ('Grape', 'Vitis vinifera', 500, 8.00);

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
        connectionString: process.argv[2]
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log('done')
}

main();