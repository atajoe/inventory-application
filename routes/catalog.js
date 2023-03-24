const express = require("express");
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');
const itemInstanceController = require('../controllers/iteminstancecontroller');
// Get Catalog Home Page
router.get('/', itemController.index)

/// ITEM ROUTES ///
// GET request for creating an item.
router.get('/item/create', itemController.item_create_get);

// POST request for creating an item.
router.post('/item/create', itemController.item_create_post);

// GET request to delete an item.


// POST request to delete an item.


// GET request to update an item.


// POST request to update an item.


// GET request for one book.


// GET request for list of all items.




// Import item instance controller


module.exports = router;
