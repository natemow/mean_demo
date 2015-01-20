var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  name: String,
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true, select: false },
  profile: {}
}, { strict: false });

// Hash the password before the user is saved.
UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) {
      return next(err);
    }

    user.password = hash;
    next();
  });
});

// Method to compare a given password with the database hash.
UserSchema.methods.comparePassword = function(password) {
  var user = this;
  return bcrypt.compareSync(password, user.password);
};

// Add CRUD methods to object for APIs.
var user = mongoose.model('User', UserSchema);
var crud = require('./crud')(user);

module.exports = user;
