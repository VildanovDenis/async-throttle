const asyncThrottle = require("../async-throttle");

function sleepFactory(timeout) {
  return () => {
    return new Promise(resolve => {
      setTimeout(function() {
          resolve(123);
        }, timeout);
    });
  }
}

const sleep = sleepFactory(1500);

describe('asyncThrottle', () => {
  it("Should return link to one promise for some calls", () => {
    const throttledSleep = asyncThrottle(sleep);
    const first = throttledSleep();
    const second = throttledSleep();
    expect(first).toEqual(second);
  });

  it("Function should call 1 time", () => {
    const mockFn = jest.fn();
    const throttledSleep = asyncThrottle(() => {
      mockFn();
      return sleep();
    });

    const first = throttledSleep();
    const second = throttledSleep();

    expect(mockFn).toBeCalledTimes(1);
  });

  it("Function should call 2 times", async() => {
    const mockFn = jest.fn();
    const throttledSleep = asyncThrottle(() => {
      mockFn();
      return sleep();
    });

    const first = throttledSleep();
    await sleepFactory(2000)();
    const second = throttledSleep();

    expect(mockFn).toBeCalledTimes(2);
  });
});