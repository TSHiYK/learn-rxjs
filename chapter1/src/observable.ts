import * as Rx from "rxjs/Rx";

const observable = Rx.Observable.create((observer) => {
  observer.next("Simon");
  observer.next("Jen");
  observer.next("Sergi");
  observer.complete();
});

observable.subscribe(
  function next(x) {
    console.log(`Next: ${x}`);
  },
  function error(error) {
    console.log(`Error: ${error}`);
  },
  function complete() {
    console.log(`Completed`);
  }
);

// MAKING AJAX CALLS WITH AN OBSERVABLE
function get(url) {
  return Rx.Observable.create((observer) => {
    let req: XMLHttpRequest = new XMLHttpRequest();
    req.open("GET", url);

    req.onload = function () {
      if (req.status === 200) {
        observer.next(req.response);
        observer.complete();
      } else {
        observer.error(new Error(req.statusText));
      }
    };

    req.onerror = function () {
      observer.error(new Error("Unknown Error"));
    };

    req.send();
  });
}

const getTest = get("http://jsonplaceholder.typicode.com/posts/1");
getTest.subscribe(
  function next(x) {
    console.log(`Result: ${x}`);
  },
  function error(error) {
    console.log(`Error: ${error}`);
  },
  function complete() {
    console.log(`Completed`);
  }
);


// rx-dom...
// export const observable2 = Rx.DOM.get("http://jsonplaceholder.typicode.com");

// CREATING OBSERVABLES FROM ARRAYS
Rx.Observable.from(["Adria", "Jen", "Sergi"])
  .subscribe(
    (x) => {
      console.log(`Next: ${x}`);
    },
    (error) => {
      console.log(`Error: ${error}`);
    },
    () => {
      console.log("Completed");
    }
  );

// CREATING OBSERVABLES FROM JAVASCRIPT EVENTS
const allMoves = Rx.Observable.fromEvent(document, "mousemove");

allMoves.subscribe((e: MouseEvent) => {
  console.log(e.clientX, e.clientY);
});

const movesOnTheRight = allMoves
  .filter((e: MouseEvent) => e.clientX > window.innerWidth / 2);

movesOnTheRight.subscribe((e: MouseEvent) => {
  console.log(`Mouse is on the right: ${e.clientX}`);
});


const movesOnTheLeft = allMoves
  .filter((e: MouseEvent) => e.clientX < window.innerWidth / 2);

movesOnTheLeft.subscribe((e: MouseEvent) => {
  console.log(`Mouse is on the left: ${e.clientX}`);
});
