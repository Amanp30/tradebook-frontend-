import React from "react";
import Stock from "./components/learnclass";

function About() {
  const indusindbk = new Stock(10, 120, 98.36);

  function argobj(...args) {
    args.forEach((element, i) => {
      console.log(arguments[i]);
    });
  }
  var data = [5, 6, 9, 7, 23, 6, 8, "asfhfdgfhj", 6, 8, "fh"];

  //   let girls = {
  //     name: "arpita",
  //     place: "kekri",
  //     age: 21,
  //   };

  //   let kvpair = [
  //     ["age", 21],
  //     ["fruit", "banana"],
  //   ];
  //   console.log(Object.fromEntries(kvpair));

  //   // Object.freeze(girls);
  //   console.log(girls.name);
  //   console.log(Object.isFrozen(girls));

  //   Object.defineProperties(girls, {
  //     property1: {
  //       value: 42,
  //       writable: true,
  //     },
  //   });

  //   Object.assign(girls, data);
  //   console.log(girls);

  //   let arr = [78, 98, 5];
  //   arr.push.apply(arr, data);
  //   console.log(Math.max.apply(null, arr));

  //   for (const [key, value] of Object.entries(girls)) {
  //     console.log(key);
  //     console.log(value);
  //   }

  //   const jsonText = `{
  //   "browsers": {
  //     "firefox": {
  //       "name": "Firefox",
  //       "pref_url": "about:config",
  //       "releases": {
  //         "1": {
  //           "release_date": "2004-11-09",
  //           "status": "retired",
  //           "engine": "Gecko",
  //           "engine_version": "1.7"
  //         }
  //       }
  //     }
  //   }
  // }`;

  //   console.log(JSON.parse(jsonText));

  // argobj(girls, ...data);

  // console.log("asg    " + Object.keys(girls)); //return keys of object
  // console.log("asg    " + Object.is(girls, data)); // return true false if not same i mean properties
  // console.log("asg    " + Object.entries(girls)); // return true false if not same i mean properties

  var newdata = [5, 4, 45, 98, 65, 6, 3, 4, 9, 5, 6];

  console.log(newdata);
  // console.log(newdata.at(5)); // returns 5th position
  // console.log(newdata.concat(data, ["aman"])); // returns two or more merged arrays
  // var entr = newdata.entries(); //A new Array iterator object.
  // console.log(entr.next().value);
  // console.log(entr.next().value);

  // const isBelowThreshold = (currentValue) => currentValue < 400;
  // console.log(newdata.every(isBelowThreshold)); //true if callbackFn returns a truthy value for every array element. Otherwise, false.

  // console.log(newdata.fill("hello", 3, 5)); // The modified array, filled with value. we can pass index also from to indexes

  // console.log(
  //   newdata.filter((element) => {
  //     return element !== 5;
  //   })
  // ); // filter and return modified array

  // console.log(data.find((element) => element > 5)); // return first element on basis of condition after searching

  // console.log(data.findIndex((element) => element > 200)); // return index number if element found in array othervise return -1

  // console.log(newdata.findLast((element) => element > 0)); // return  undefined if condition not satisfied else last index where element found .

  // console.log(newdata.findLastIndex((element) => element > 9)); // method iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.

  // console.log(
  //   [
  //     [7, [8, 9]],
  //     [45, 65, "fgh", 7],
  //   ].flat(5)
  // ); // The flat() method creates a new array with all sub-array elements concatenated into it recursively up to the specified depth. we can pass depth like 5 or anything

  // newdata.forEach((element) => console.log(element));   //The forEach() method executes a provided function once for each array element.

  // console.log(Array.from([1, 2, 3], (x) => x * x)); // static method creates a new, shallow-copied Array instance from an iterable or array-like object.
  // console.log(newdata.includes(5)); // The includes() method determines whether an array includes a certain value among its entries, returning true or false as appropriate.
  // console.log(newdata.indexOf(5)); // The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present.
  // console.log(Array.isArray(newdata)); // The Array.isArray() static method determines whether the passed value is an Array.
  // console.log(newdata.join("-")); // join all elements and return string we can also use seprator -
  // console.log(newdata.map((x) => x + 5)); // The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
  // console.log(newdata.pop()); // return the last element and remove it from array and length is changed
  // console.log(newdata.push("tuh")); // The push() method adds one or more elements to the end of an array and returns the new length of the array.
  // console.log(newdata.reduce((acc, val) => acc + val, 89)); // The first time that the callback is run there is no "return value of the previous calculation". If supplied, an initial value may be used in its place. Otherwise the array element at index 0 is used as the initial value and iteration starts from the next element (index 1 instead of index 0).

  // console.log(newdata.reverse()); // returns reversed array
  // console.log(newdata.shift()); // The shift() method removes the first element from an array and returns that removed element. This method changes the length of the array.
  // console.log(newdata.slice(5, 9)); // The slice() method returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.

  // console.log(newdata.some((element) => element % 2 === 0)); // The some() method tests whether at least one element in the array passes the test implemented by the provided function. It returns true if, in the array, it finds an element for which the provided function returns true; otherwise it returns false. It doesn't modify the array.
  // console.log(newdata.splice(1, 6, "hello")); // The splice() method changes the contents of an array by removing or replacing existing elements and/or adding new elements in place. To access part of an array without modifying it,
  // console.log(newdata.unshift(1, 6, "hello")); // The unshift() method adds one or more elements to the beginning of an array and returns the new length of the array.
  // console.log(newdata.values()); // The values() method returns a new array iterator object that iterates the value of each item in the array.

  return (
    <div>
      <p>Buy amount - {indusindbk.buyamount}</p>
      <p>Sell amount - {indusindbk.sellamount}</p>
      <p>Profit - {indusindbk.profit}</p>
      <p>brokerage charges - {indusindbk.brokerage}</p>
      <p>stt - {indusindbk.stt}</p>
      <p>Stamp duty - {indusindbk.stampduty}</p>
      <p>transaction charges - {indusindbk.transactioncharges}</p>
      <p>Sebi charges - {indusindbk.sebicharges}</p>
      <p>gst charges - {indusindbk.gst}</p>
      <p>Total taxes charges - {indusindbk.totaltaxes}</p>
      <p>breakeven - {indusindbk.breakeven}</p>
      <p>othercharges - {indusindbk.othercharges}</p>
      <p>netpnl - {indusindbk.netpnl}</p>
      <p>Gain percent - {indusindbk.gainpercent}</p>
    </div>
  );
}

export default About;
