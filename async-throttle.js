/**
 * @description Function asyncThrottle gets function, that return promise, 
 * if argument function isnt resolved, asyncThrottle returns this function for new call. 
 * Or calls just calls new functon. 
 * @example
 * @param {*} fn 
 * @returns typeof fn
 */
function asyncThrottle(fn) {
  let isThrottled = false,
      fnResult;


  return function(...args) {
    if (isThrottled) {
      return fnResult;
    }

    isThrottled = true;
    fnResult = fn(...args);
    
    fnResult.then(result => {
      isThrottled = false;
      fnResult = null;

      return result;
    });
    return fnResult; 
  }
}
module.exports =  asyncThrottle;

// const throttledSleep = asyncThrottle(sleep);

// const first = throttledSleep();
// const second = throttledSleep();

// console.log(`First and second: ${first}, ${second}, ${first === second}`);