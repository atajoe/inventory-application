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
router.get('/item/delete/:id', itemController.item_delete_get);

// POST request to delete an item.
router.post('/item/delete/:id', itemController.item_delete_post);

// GET request to update an item.
router.get('/item/update/:id', itemController.item_update_get);

// POST request to update an item.
router.post('/item/update/:id', itemController.item_update_post);

// GET request for list of all items.
router.get('/item/item_list', itemController.item_list);

// GET request for detail of an item.
router.get('/item/:id', itemController.item_detail);

// Secretly wipe out all of the documents in the item collections DB.
router.get('/item/secret_delete', itemController.secret_delete);


/// CATEGORY ROUTES ///

// GET request for creating a category.
router.get('/category/create', categoryController.category_create_get);

// POST request for creating a category.
router.post('/category/create', categoryController.category_create_post);


// GET request for list of all categories
router.get('/category/category_list', categoryController.category_list);

// GET request for detail of a category.
router.get('/category/:id', categoryController.category_detail);

// GET request for delete category.
router.get('/category/delete/:id', categoryController.category_delete_get);

// POST request for delete category.
router.post('/category/delete/:id', categoryController.category_delete_post);

// GET request for update of a category.
router.get('/category/update/:id', categoryController.category_update_get);

// POST request for update of a category.
router.post('/category/update/:id', categoryController.category_update_post);

/// ITEM INSTANCE ROUTES ///

// GET request for creating a new item instance.
router.get('/iteminstance/create', itemInstanceController.itemInstance_create_get);

// POST request for creating a new item instance.
router.post('/iteminstance/create', itemInstanceController.itemInstance_create_post);

// GET request for list of all item instances.
router.get('/iteminstance/iteminstance_list', itemInstanceController.itemInstance_list);

// GET request for detail of an item instance.
router.get('/iteminstance/:id', itemInstanceController.itemInstance_detail);

// GET request for delete item instance.
router.get('/iteminstance/delete/:id', itemInstanceController.itemInstance_delete_get);

// POST request for delete item instance.
router.post('/iteminstance/delete/:id', itemInstanceController.itemInstance_delete_post);

// GET request to update an item instance.
router.get('/iteminstance/update/:id', itemInstanceController.itemInstance_update_get);

// POST request to update an item instance.
router.post('/iteminstance/update/:id', itemInstanceController.itemInstance_update_post);



module.exports = router;
