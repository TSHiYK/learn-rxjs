import {Observable} from "rxjs/Rx";

const logValue = (val) => {
  console.log(val);
};

// Observables
const src = Observable.range(1, 5);
// Old JS Array
const src_old = [1, 2, 3, 4, 5];

// MAP
const upper = src.map(name => name * 2);
upper.subscribe(logValue);

const upper_old = src_old.map(name => name * 2);
upper_old.forEach(logValue);

// FILTER
const isEven = val => {
  return (val % 2) !== 0;
};

const even = src.filter(isEven);
even.subscribe(logValue);

const even_old = src_old.filter(isEven);
even_old.forEach(logValue);

// REDUCE
const sum = src.reduce((acc, x) => acc + x);
sum.subscribe(logValue);

const sum_old = src_old.reduce((a, b) => a + b);
console.log(sum_old);

// Aggregate Operators

// average
const avg = Observable.range(0, 5)
  .reduce((prev, cur) => {
    return {
      sum: prev.sum + cur,
      count: prev.count + 1
    };
  }, {sum: 0, count: 0})
  .map(o => o.sum / o.count);
const subscription = avg.subscribe(x => {
  console.log(`Average is: ${x}`);
});

// FLATMAP
// function concatAll(source) { // like a flatmap
//   return source.reduce((a: any[], b: any[]) => {
//     a.concat(b);
//   });
// }
// console.log(concatAll([[0, 1, 2], [3, 4, 5], [6, 7, 8]]));
