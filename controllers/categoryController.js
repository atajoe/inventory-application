const Category = require('../models/category');
const categoryInstance = Category;

const category_create_get = (req,res,next) => {
    res.send('Get the category')
};

const category_create_post = (req,res,next) => {
    const newCategory = new categoryInstance({'title':'Motherboard', 'description': 'Greatest motherboard ever!'})
    newCategory.save()
               .then((result) => {
                console.log(result)
                res.redirect('/category/create')
               })
               .catch((err) => {
                console.log(err)
               })
}


module.exports = {
    category_create_get,
    category_create_post
}
