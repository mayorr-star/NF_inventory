const asyncHandler = require('express-async-handler');

const getAllProduce = asyncHandler(async(req, res)=> {
    console.log('all produce');
})

const createNewProduce = asyncHandler(async(req, res)=> {
    console.log('produce created');
})

const deleteProduce = asyncHandler(async(req, res)=> {
    console.log('produce deleted');
})

const updateProduce = asyncHandler(async(req, res)=> {
    console.log('produce updated');
})

module.exports = {
    getAllProduce,
    createNewProduce,
    deleteProduce,
    updateProduce
}