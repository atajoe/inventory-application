const Item = require("../models/item");
const Category = require("../models/category");
const ItemInstance = require("../models/itemInstance");
const { body, validationResult } = require("express-validator");

exports.index = (req,res) => {

    async function getItems(){
        const response = await Item.countDocuments({});
        return response
    }

    async function getCategories(){
        const response = await Category.countDocuments({});
        return response
    }

    async function getItemInstances(){
        const response = await ItemInstance.countDocuments({});
        return response
    }

    async function getAllCounts(){
        return Promise.all([getItems(), getCategories(), getItemInstances()])
        }

    getAllCounts().then((results) => {
        console.log('Here are the results: ', results)
        const amounts = {itemCount: results[0], categoryCount: results[1], itemInstanceCount: results[2]}

        res.render("catalogindex", {
            title: "One Stop Computer Shop",
            data: amounts
        })
    }).catch((err) => console.log(err))
}

// Display item create form on GET.
exports.item_create_get = async (req,res,next) => {
    const [items, categories] = await Promise.all([
        Item.find().exec(),
        Category.find().exec()
    ]);
   
    const formData = {
        items,
        categories
    }
    console.log('this is formData', formData)
    res.render("itemform", {
        title: "Fill out an item",
        data: formData
    })
}

// Handle item create form on POST.
exports.item_create_post = (req,res,next) => {
    console.log('POST request made')
    console.log(req.body)
}

