const Category = require('../models/category');
const Item = require('../models/item');

// Handle category create form on GET.
exports.category_create_get = (req,res,next) => {
    res.render('categoryform', {title: 'Create a new category'});
};


// Handle category create form on POST.
exports.category_create_post = (req,res,next) => {
    console.log(req.body)
    const newCategory = new Category(req.body)
    newCategory.save()
               .then((result) => {
                console.log(result)
                res.redirect('/catalog/category/create')
               })
               .catch((err) => {
                console.log(err)
               })
}

// Get all categories.
exports.category_list = async (req,res,next) => {
    const categories = await Category.find({}).exec();
    console.log('Here are the categories: ', categories)
    res.render("category_list", { title:"Category List", data: categories })
}

// Get all the details of the category & associated items with it.
exports.category_detail = async (req,res,next) => {
    console.log(req.params.id)
    const category = await Category.findOne({_id: req.params.id}).exec();
    const items_in_category = await Item.find().exec();
    const category_items = items_in_category.filter((item) => item.category.toString() === req.params.id)
    console.log('Here is the selected category: ', category_items)
    console.log('here is the categories', category)
    res.render('category_detail', {title: "Category Detail", data: {category, category_items}})
}

exports.category_delete_get = async (req,res,next) => {
    console.log('Category delete get id:', req.params.id);
    const category = await Category.findOne({_id: req.params.id}).exec();
    console.log('here is category on delete get', category);
    const items_in_category = await Item.find({category: category._id}).exec();
    console.log('here are the associated items with the category: ', items_in_category);
    res.render("category_delete", {title: "Category Detail", data: items_in_category, categoryData: category});
}

exports.category_delete_post = async (req,res,next) => {
    console.log('category delete body: ', req.body)
    Category.findByIdAndDelete(req.body.categoryid)
        .then((result) => {
            console.log(result)
            res.redirect('/catalog')
        })
        .catch((err) => console.log(err))
}

exports.category_update_get = async (req,res,next) => {
    const category = await Category.findById(req.params.id).exec();
    console.log('this is category on category update get', category)
    res.render("category_update", {title: "Update Item Form", data: category});
}

exports.category_update_post = async (req,res,next) => {
    console.log(req.body)
    Category.findByIdAndUpdate(req.body.categoryid, {
        title: req.body.title,
        description: req.body.description
    })
    .then((result) => {
        console.log('Updated!')
        res.redirect('/catalog')
    })
    .catch((err) => console.log(err));
}

