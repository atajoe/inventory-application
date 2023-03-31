const Item = require("../models/item");
const Category = require("../models/category");
const ItemInstance = require("../models/itemInstance");
const { body, validationResult } = require("express-validator");

exports.index = (req,res) => {
    async function getAllCounts(){
        return Promise.all([Item.countDocuments({}), Category.countDocuments({}), ItemInstance.countDocuments({})])
        }

    getAllCounts().then((results) => {
        console.log('Here are the results: ', results)
        const amounts = {itemCount: results[0], categoryCount: results[1], itemInstanceCount: results[2]}

        res.render("catalogindex", {
            title: "One Stop Computer Shop",
            data: amounts
        })
    }).catch((err) => console.log(err))
    
    
    // Item.findOne({ title: "Zotac22" })
    //     .populate("category")
    //     .exec()
    //     .then((data) => console.log('Here is zotac data', data.category[0].title))
}

// Handle item create form on GET.
exports.item_create_get = async (req,res,next) => {
    const items = await Item.find().exec();
    const categories = await Category.find().exec();
    // const [items, categories] = await Promise.all([
    //     Item.find().exec(),
    //     Category.find().exec()
    // ]);
    
    const formData = {
        items,
        categories
    }
    console.log('this is formData', formData.categories)
    res.render("itemform", {
        title: "Create a new item",
        data: formData
    })
}

// Handle item create form on POST.
exports.item_create_post = async (req,res,next) => {
    console.log('POST request made')
    req.body.category === 'Graphics' ? req.body.category = 'Graphics Card' : req.body.category
    let getCategory = await Category.findOne({title: req.body.category});
    let new_item = new Item({
        title: req.body.title,
        description: req.body.description,
        category: getCategory._id.toString(),
        launchDate: req.body.launchDate
    })
    new_item.save()
            .then(data => {
                res.redirect('/catalog')
            })
}

// Get all items.
exports.item_list = async (req,res,next) => {
    const items = await Item.find({}).exec()
    res.render("item_list", {title: "Item List", data: items})

}

// Get details of an item.
exports.item_detail = async (req,res,next) => {
    console.log(req.params.id)
    const item = await Item.findById(req.params.id).populate("category").exec();
    const itemInstances = await ItemInstance.find({item: req.params.id}).exec();
    console.log('Here are the item instances for item details: ', itemInstances);
    const { title, description, launchDate, id } = item;
    const { title: categoryTitle } = item.category[0];
    res.render("item_detail", {title:"Item details", data: { id, title,description,launchDate, categoryTitle, instances: itemInstances }})
}

// Handle delete item form on GET.
exports.item_delete_get = async (req,res,next) => {
    console.log(req.params.id)
    const item = await Item.findById(req.params.id).populate("category").exec()
    const itemInstances = await ItemInstance.find({item: req.params.id}).populate("item").exec();
    console.log('Here is the item: ', item)
    console.log('Here are the instances ', itemInstances);
    res.render("item_deleteitems", {title: "Delete Item Instances", item:  item , itemInstances: itemInstances }) 
}

// Handle delete item form on POST.
exports.item_delete_post = async (req,res,next) => {
    console.log('This is the request body for delete POST', req.body)
    Item.findByIdAndDelete(req.body.itemid)
        .then((result) => {
            console.log(result)
            res.redirect('/catalog')
        })
        .catch((err) => console.log(err))
}

// Handle update item form on GET.
exports.item_update_get = async (req,res,next) => {
    const item = await Item.findById(req.params.id).populate("category").exec();
    console.log('Result from item update get', item)
    const categories = await Category.find().exec();
    res.render("item_update", {title: "Update Item Form", data: item, categories, _id: req.params.id});
}

// Handle update item form on POST.
exports.item_update_post = async (req,res,next) => {
    console.log('This is the req.body on item update POST: ', req.body)
    req.body.category === "Graphics" ? req.body.category = "Graphics Card" : req.body.category;
    const category = await Category.findOne({title: req.body.category})
    console.log(category)
    req.body.category = category._id
    try {
        const item = await Item.findByIdAndUpdate(req.body.itemid, {
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            launchDate: req.body.launchDate
        })
        res.redirect('/catalog')
    } catch (err){
        console.log(err)
    }
    
}

exports.secret_delete = async (req,res,next) => {
    const deleteItems = await Item.deleteMany({});
    console.log(deleteItems)
        
}

