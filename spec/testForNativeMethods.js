// make sure we are not using native methods
const testForNativeMethods = (loscoreMethod) => {
  it("should not use native methods its implementation", () => {
    // SETUP
    const disallowedMethods = [
      "map",
      "indexOf",
      "forEach",
      "filter",
      "reduce",
      "every",
      "some",
    ];
    const backup = {};

    for (const key of disallowedMethods) {
      backup[key] = Array.prototype[key];
      /* eslint-disable no-extend-native */
      Array.prototype[key] = () => {
        // ASSERT
        throw Error("not allowed to call native array method");
      };
    }

    // EXERCISE
    loscoreMethod();

    // TEARDOWN
    for (const key of disallowedMethods) {
      /* eslint-disable no-extend-native */
      Array.prototype[key] = backup[key];
    }
  });
};

module.exports = { testForNativeMethods };
