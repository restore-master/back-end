export const log = (...args) =>
  process.env.DEBUG === 'true' ?  console.log(...args): undefined;
export const logError = (...args) =>
  process.env.DEBUG === 'true' ? console.error(...args) : undefined;
export const daysToMilliseconds = (days) => days * 1000 * 60 * 60 * 24;
export const map = (list, cb) =>
  Array.prototype.map.call(list, cb);
export const filter = (list, cb) =>
  Array.prototype.filter.call(list, cb);