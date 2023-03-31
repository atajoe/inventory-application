const express = require('express');
const router = express.Router();
const itemInstance = require('../models/itemInstance');
const Item = require('../models/item');

// Handle item instance create form on GET.
exports.itemInstance_create_get = async (req,res,next) => {
    const items = await Item.find({}).exec();
    res.render('iteminstanceform', {title: 'Create a new item instance', data: items})
}

// Handle item instance create form on POST.
exports.itemInstance_create_post = async (req,res,next) => {
    console.log(req.body)
    let getItem = await Item.findOne({title: req.body.item}).exec();
    console.log('Now its changed', req.body)
    const newitemInstance = new itemInstance({
        item: getItem._id,
        condition: req.body.condition,
        price: req.body.price
    })
    newitemInstance.save()
                    .then(data => {
                        res.redirect('/catalog')
                    })
 }

// List all of the item instances.
 exports.itemInstance_list = async (req,res,next) => {
    const itemInstances = await itemInstance.find({}).populate('item').exec();
    const iteminstancearray = [];
    itemInstances.forEach((item) => {
        let { title } = item.item;
        let { condition, price, _id } = item;
        iteminstancearray.push({title, condition, price, _id})
    });

    res.render('iteminstance_list', {title: "Item Instance List", data: iteminstancearray});
    
 }

 // Get all the details of an item instance.
 exports.itemInstance_detail = async (req,res,next) => {
    console.log(req.params.id)
    const itemInstanceDetail = await itemInstance.findOne({_id: req.params.id}).populate("item").exec();
    console.log(itemInstanceDetail)
    res.render('iteminstance_detail', {title: 'Item Instance Detail', data: itemInstanceDetail})
 }

 // Handle delete item instance form on GET.
exports.itemInstance_delete_get = async (req,res,next) => {
    console.log(req.params.id)
    const instance = await itemInstance.findOne({_id: req.params.id}).exec();
    console.log('Here are the instances ', instance);
    res.render("iteminstance_deleteitems", {
        title: "Delete Item Instance/Copy", 
        instance: instance
    }) 
}

// Handle delete item instance form on POST.
exports.itemInstance_delete_post = async (req,res,next) => {
    console.log('This is the request body for delete POST', req.body)
    itemInstance.findByIdAndDelete(req.body.itemid)
        .then((result) => {
            console.log(result)
            res.redirect('/catalog')
        })
        .catch((err) => console.log(err))
}

// Handle update item instance form on GET.
exports.itemInstance_update_get = async (req,res,next) => {
    console.log('This is the req.params', req.params.id)
    const instance = await itemInstance.findById(req.params.id).populate("item").exec();
    console.log('instance lol', instance)
    res.render("iteminstance_update", {title: "Update Item Instance Form", data: instance})
}

// Handle update item instance form on POST.
exports.itemInstance_update_post = async (req,res,next) => {
    console.log('This is the req.body in item instance update on POST: ', req.body)
    const instanceTitle = await itemInstance.findById(req.body.iteminstanceid).populate("item").exec();
    console.log('this is instancetitle', instanceTitle)
    req.body.item = instanceTitle.item._id;
    try {
        const instance = await itemInstance.findByIdAndUpdate(req.body.iteminstanceid, {
            item: req.body.item,
            condition: req.body.condition,
            price: req.body.price,
        })
        console.log(instance)
        // res.redirect('/catalog')
    } catch (err){
        console.log(err)
    }
  
}