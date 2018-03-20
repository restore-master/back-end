import User from './user.js';
import Profile from './profile.js';
import Photo from './photo.js';
import Customer from './customer';
import Report from './report';

export default (db) => {
  User(db);
  Profile(db);
  Photo(db);
  Customer(db);
  Report(db);
};