const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const usersSchema = new Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  fullname: {
    type: String
  },
  dob: {
    type: Date
  },
  avatar: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    require: true
  },
  active: {
    type: Boolean,
    default: true
  },
  profile: {
    type: ObjectId
  }
}, {timestamps: {createAt: 'create_at', updateAt: 'update_at'}});

usersSchema.pre('save', function(next) {
  let user = this;
  if (user) {
    bcrypt.genSalt(function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) {
        user.password = hash;
        next();
      });
    });
  }
})

module.exports = usersSchema;
