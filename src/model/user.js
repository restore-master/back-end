'use strict';

import * as bcrypt from 'bcrypt';
import {randomBytes} from 'crypto';
import * as jwt from 'jsonwebtoken';
import createError from 'http-errors';
import Mongoose, {Schema} from 'mongoose';

const userSchema =  new Schema({
  email: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  passwordHash: {type: String, required: true},
  randomHash: {type: String,  unique: true, default: ''},
  profile: {type: Schema.Types.ObjectId},
});

userSchema.methods.passwordCompare = function(password){
  return bcrypt.compare(password, this.passwordHash)
    .then(success => {
      if (!success)
        throw createError(401, 'AUTH ERROR: wrong password');
      return this;
    });
};

userSchema.methods.tokenCreate  = function(){
  this.randomHash = randomBytes(32).toString('base64');
  return this.save()
    .then(() => {
      return jwt.sign({randomHash: this.randomHash}, process.env.SECRET);
    })
    .then(token => {
      return token;
    });
};

const User = Mongoose.model('user', userSchema);

User.create = function (user) {
  if(!user.password || !user.email || !user.username)
    return Promise.reject(
      createError(400, 'VALIDATION ERROR: missing username email or password '));

  let {password} = user;
  user = Object.assign({}, user, {password: undefined});

  return bcrypt.hash(password, 1)
    .then(passwordHash => {
      let data = Object.assign({}, user, {passwordHash}); 
      return new User(data).save();
    });
};

export default User;