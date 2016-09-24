import {Observable} from "rxjs/Rx";

// Visualizing Observables

const a = Observable.interval(200).map(i => `A${i}`);
const b = Observable.interval(100).map(i => `B${i}`);

Observable.merge(a, b).subscribe(x => console.log(x));
