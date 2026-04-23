'use strict';

// unable to implement 'empty'. Using 'undefined' instead for now
function MyArray() {
    if (arguments.length === 1 && Number.isInteger(arguments[0]) && arguments[0] >= 0 && arguments[0] < (2 ** 32 - 1)) {
        this.length = arguments[0];
    } else {
        this.length = arguments.length;
        for (let i = 0; i < arguments.length; i++) {
            this[i] = arguments[i];
        }
    }
}
const myReduceRight = function (callback, initialValue) {
    let lastNonEmptyIndex = -1;
    for (let i = this.length - 1; i >= 0; i--) {
        if (typeof this[i] !== 'undefined') {
            lastNonEmptyIndex = i;
            break;
        }
    }
    if (lastNonEmptyIndex < 0 && initialValue === undefined) {
        throw new TypeError('Reduce of empty array with no initial value');
    }
    let result = initialValue ?? this[lastNonEmptyIndex];
    const initialIndex = lastNonEmptyIndex - (initialValue === undefined);
    if (initialIndex < 0) return result;
    for (let i = initialIndex; i >= 0; i--) {
        if (this[i] !== undefined) {
            result = callback(result, this[i], i, this);
        }
    }
    return result;
}
MyArray.prototype.reduceRight = myReduceRight;

const testFunc = (a, b) => a - b;
// console.dir(new MyArray().reduceRight(testFunc); // TypeError
console.dir(new MyArray(-2).reduceRight(testFunc));
// console.dir(new MyArray(10).reduceRight(testFunc); // TypeError
console.dir(new MyArray('10').reduceRight(testFunc));
console.dir(new MyArray(null, { a: 5 }, [2, 4, 5], '', undefined).reduceRight(testFunc));
console.dir(new MyArray(1, 2, 3, 4, 5).reduceRight(testFunc));
console.dir(new MyArray(1, 2, 3, 4, 5).reduceRight(testFunc, -100));
