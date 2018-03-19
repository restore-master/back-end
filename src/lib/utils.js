export const log = (...args) => 
  process.env.DEBUG === 'true' ?  console.log(...args): undefined;

export const logError = (...args) =>  
  process.env.DEBUG === 'true' ? console.error(...args) : undefined;