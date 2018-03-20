import Customer from './customer.js';
import Report from './report.js';

export default (db) => {
  Customer(db);
  Report(db);
};
