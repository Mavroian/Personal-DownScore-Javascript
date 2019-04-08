// Let's make an object and start adding methods to it!
class LoScore {
  identity(val) {
    return val;
  }

  /**
  | ARRAYS
  |~~~~~~~~~~
  * */
  uniq(array) {
    let status;
    let newArray = [];
    for (let i = 0; i < array.length; i++) {
      status = true;
      for (let j = 0; j < newArray.length; j++) {
        if (array[i] === newArray[j]) {
          status = false;
        }
      }
      if (status === true) {
        newArray.push(array[i]);
      }
    }
    return newArray;
  }

  /**
  | COLLECTIONS
  |~~~~~~~~~~
  * */
  each(collection, iterator) {
    if (collection instanceof Array) {
      for (let i = 0; i < collection.length; i += 1) {
        iterator(collection[i], i, collection);
      }
    } else {
      const keys = Object.keys(collection);
      for (let i = 0; i < keys.length; i += 1) {
        iterator(collection[keys[i]], keys[i], collection);
      }
    }
  }

  map(collection, iteratee) {
    let newArray = [];
    this.each(collection, (element) => {
      newArray.push(iteratee(element));
    });
    return newArray;
  }

  filter(collection, test) {
    const result = [];
    this.each(collection, (val) => test(val) && result.push(val));
    return result;
  }

  reject(collection, test) {
    return this.filter(collection, (element) => !test(element));
  }

  reduce(collection, iterator, accumulator) {
    this.each(collection, (element, i) => {
      if (accumulator === undefined && i === 0) {
        accumulator = element;
      } else {
        accumulator = iterator(accumulator, element, i);
      }
    });

    return accumulator;
  }

  every(collection, test = this.identity) {
    return this.reduce(
      collection,
      (acc, element) => !!test(element) && acc,
      true
    );
  }

  /**
  | OBJECTS
  |~~~~~~~~~~
  * */
  extend(obj, ...objects) {
    this.each(objects, (object) => {
      //Object.assign(obj, object); we are not supposed to do this!!
      for (let key in object) {
        obj[key] = object[key];
      }
    });
    return obj;
  }

  /**
  | FUNCTIONS
  |~~~~~~~~~~
  * */

  once(func) {
    let status = true;
    let result;
    return function(...args) {
      if (status === false) {
        return result;
      } else {
        result = func(...args);
        status = false;
        return result;
      }
    };
  }

  memoize(func) {
    let hash = {};
    return function memo(arg) {
      if (hash.hasOwnProperty(arg)) {
        return hash[arg];
      }
      hash[arg] = func(arg);
      return hash[arg];
    };
  }

  invoke(collection, functionOrKey) {
    let array = [];

    if (typeof functionOrKey === "function") {
      this.each(collection, function(element) {
        array.push(functionOrKey.apply(element));
        // console.log(element.functionOrKey);
        // console.log(functionOrKey(element));
      });
      return array;
    }
    this.each(collection, (element) => {
      // console.log(element[functionOrKey]());
      array.push(element[functionOrKey]());
    });
    return array;
  }

  /**
  | ADVANCED REQUIREMENTS
  |~~~~~~~~~~~~~
  * */

  sortBy() {
    // YOUR CODE HERE
  }

  zip() {
    // YOUR CODE HREE
  }

  delay() {
    // YOUR CODE HERE
  }

  defaults() {
    // YOUR CODE HERE
  }

  throttle() {
    // YOUR CODE HERE
  }
}

module.exports = new LoScore();
