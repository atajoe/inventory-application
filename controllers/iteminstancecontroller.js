const express = require('express');
const router = express.Router();
const itemInstance = require('../models/itemInstance');

exports.getItemInstance = (req,res,next) => {
    itemInstance.find({})
                .then(results => {
                    res.render("iteminstance", {title: 'Item Instances', data: results})
                })
}