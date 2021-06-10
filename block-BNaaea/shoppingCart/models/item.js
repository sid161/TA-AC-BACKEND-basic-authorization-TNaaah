var express = require('express');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var itemSchema = new Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
    likes: { type: Number, default: 0 },

    commentId: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    authorId: { type: Schema.Types.ObjectId, ref: 'User' },
    category: [String],
  },
  { timestamps: true }
);

var Item = mongoose.model("Item",itemSchema)
module.exports = Item;