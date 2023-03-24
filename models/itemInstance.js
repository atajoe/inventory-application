const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: "item", required: true },
    condition: { 
        type: String,
        enum: ["New", "Used", "Refurbished"],
        default: "New" 
    },
    price: { type: Number, required: true }
});

ItemInstanceSchema.virtual("url").get(function(){
    return `/catalog/iteminstance/${this._id}`
});


module.exports = mongoose.model("ItemInstance", ItemInstanceSchema);