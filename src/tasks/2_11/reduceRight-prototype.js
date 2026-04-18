'use strict';

const myArray = [[0, 1], 1, 'one', { a: 'b', c: 'd' }, '', {}, , NaN, undefined, null, Infinity, 0, []];
console.log(myArray.reduceRight((a, b) => a.concat(b), []));
const myReduceRight = function (callback, initialValue) {
    let result = initialValue !== undefined ? initialValue : this[this.length - 1];
    const initialIndex = this.length - 1 - (initialValue !== undefined);
    if (initialIndex < 0) return result;
    for (let i = initialIndex; i >= 0; i--) {
        result = callback(result, this[i], i, this);
    }
    console.log('myReduceRight'); // @todo discuss
    return result;
};
console.log(myArray);

// MyArray constructor. Object.create() @todo discuss
function MyArray(...inputArray) {
    this.array = inputArray;
    //this.reduceRight = [].reduceRight.bind(this.array); // @todo discuss
};
MyArray.prototype.reduceRight = function (callback, initialValue) {
    let result = initialValue !== undefined ? initialValue : this[this.array.length - 1];
    const initialIndex = this.array.length - 1 - (initialValue !== undefined);
    if (initialIndex < 0) return result;
    for (let i = initialIndex; i >= 0; i--) {
        result = callback(result, this.array[i], i, this.array);
    }
    console.log('prototype myReduceRight'); // @todo discuss
    return result;
};
const myArray1 = new MyArray(...myArray);
console.log(myArray1.reduceRight((a, b) => a.concat(b), []));

// __proto__
const myArray2 = Object.create(myArray); // no Array.create() @todo discuss
myArray2.__proto__.reduceRight = myReduceRight;
console.log(myArray2.reduceRight((a, b) => a.concat(b), []));

// @todo discuss why initial array was affected while Object.create was used
console.log(myArray.reduceRight((a, b) => a.concat(b), []));
