const asyncHandler = require('express-async-handler');
const db = require('../db/queries');
const getCurrentYear = require('../utilis/year');
const currentYear = getCurrentYear();

const getAllProduce = asyncHandler(async(req, res)=> {
    const farmProduce = await db.fecthAllProduce();
    const categories = await db.getCategories();
    
    if(!farmProduce || !categories) {
        throw new NotFoundError("Not found");
    }
    res.render('index', {categories: categories, produce: farmProduce, year: currentYear});
})

const createNewProduce = asyncHandler(async(req, res)=> {
    const { cmName, sciName, numItems, unit, price, area} = req.body;
    console.log(cmName, sciName, numItems, unit, price, area);
    await db.insertProduceItem(cmName, sciName, numItems, unit, price);
    await db.insertLandArea(area);
    res.redirect('/');
    console.log('produce created');
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
    res.render('produceForm', {year: currentYear, categories: categories});
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