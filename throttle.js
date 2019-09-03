function throttle(fn, ms) {

    let isThrottling = false;
    let hasTrailingCall = false;
    let lastContext, lastArgs, lastResult;

    const callFunction = (context, args) => {
        lastResult = fn.apply(context, args);
        isThrottling = true;

        setTimeout(() => {
            isThrottling = false;

            if (hasTrailingCall) {
                callFunction(lastContext, lastArgs);
                lastContext = undefined;
                lastArgs = undefined;
                hasTrailingCall = false;
            }
        }, ms);
    }

    return function(...args) {

        if (!isThrottling) {
            callFunction(this, args);
        } else {
            hasTrailingCall = true;
            lastContext = this;
            lastArgs = args;
        }

        return lastResult
    }
};

module.exports = throttle;