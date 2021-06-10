var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var userSchema = new Schema(
  {
    name: { type: String, required: true },

    email: { type: String, unique: true },
    password: { type: String, minlength: 5 },

    isAdmin: { type: Boolean, default: false },
    itemId: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    bcrypt.hash(this.password, 10, (err, hashed) => {
      if (err) next(err);
      this.password = hashed;
      return next();
    });
  } else {
    next();
  }
});
userSchema.methods.verifyPassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, result) => {
    return cb(err, result);
  });
};

userSchema.pre('save', function (next) {
  if (this.email.includes('admin')) {
    this.isAdmin = true;
    next();
  } else {
    next();
  }
});
var User = mongoose.model('User', userSchema);

module.exports = User;