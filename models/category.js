const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: { type: String, maxLength: 100, minLength: 3, required: true},
    description: { type: String, maxLength: 50, minLength: 3, required: true}
})

categorySchema.virtual("url").get(function(){
    return `/category/item/${this._id}`
})

module.exports = mongoose.model("Category", categorySchema);