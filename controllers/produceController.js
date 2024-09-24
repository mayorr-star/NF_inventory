const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const getCurrentYear = require('../utilis/year');
const NotFoundErrorClass = require('../utilis/errorhandling/errors/NotFoundError');

const currentYear = getCurrentYear();

const getAllProduce = asyncHandler(async(req, res)=> {
    const farmProduce = await db.getAllProduce();
    const categories = await db.getCategories();
    
    if(!farmProduce) {
        throw new NotFoundErrorClass("Farm produce not found!");
    } else if (!categories) {
        throw new NotFoundErrorClass('Categories not found!');
    }

    res.render('index', {categories: categories, produce: farmProduce, year: currentYear});
})

const createNewProduce = asyncHandler(async(req, res)=> {
    const { cmName, sciName, numItems, unit, price, land_size, category} = req.body;
    await db.insertProduceItem(cmName, sciName, numItems, unit, price);
    const produceId = await db.getProduceId(cmName);
    const landId = await db.getLandId(land_size);
    const categoryId = await db.getCategoryId(category);
    await db.insertProduceIdLandId(produceId[0].id, landId[0].id);
    await db.insertProduceIdCategoryId(produceId[0].id, categoryId[0].id)
    res.redirect('/');
})

const deleteProduce = asyncHandler(async(req, res)=> {
    const { produceId } = req.params;
    await db.deleteProduceItem(produceId);
    res.redirect('/');
    console.log('produce deleted');
})

const updateProduce = asyncHandler(async(req, res)=> {
    const {produceId} = req.params;
    await db.updateProduceItem(produceId)
    res.redirect('/');
    console.log('produce updated');
})

const getNewItemForm = asyncHandler(async(req, res) => {
    const categories = await db.getCategories();
    const landSizes = await db.getLandSizes();
    if (!categories) {
        throw new NotFoundErrorClass('Form not found!');
    } else if (!landSizes) {
        throw new NotFoundErrorClass('Land sizes not found!');
    }
    res.render('produceForm', {year: currentYear, categories: categories, landSizes: landSizes});
})

const getProduce = asyncHandler(async(req, res) => {
    res.send('form');
})

module.exports = {
    getAllProduce,
    createNewProduce,
    deleteProduce,
    updateProduce,
    getNewItemForm,
    getProduce
}