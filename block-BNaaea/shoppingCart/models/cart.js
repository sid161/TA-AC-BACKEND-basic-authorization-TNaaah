var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var cartSchema = new Schema(
    {
      items: [
        {
          itemId: { type: Schema.Types.ObjectId, ref: 'Item' },
          quantity: { type: Number, default: 0 },
        },
      ],
  
      owner: { type: Schema.Types.ObjectId, ref: 'User' },
    },
    { timestamps: true }
  );

  
var Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;