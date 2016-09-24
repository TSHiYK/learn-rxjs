import {Observable} from "rxjs/Rx";

const counter = Observable.interval(1000);

const subscription1 = counter.subscribe(i => {
  console.log(`Subscription 1: ${i}`);
});

const subscription2 = counter.subscribe(i => {
  console.log(`Subscription 2: ${i}`);
});

setTimeout(() => {
  console.log("Canceling subscription2!");
  // RxJS 4: subscription2.dispose();
  subscription2.unsubscribe();
}, 3000);
