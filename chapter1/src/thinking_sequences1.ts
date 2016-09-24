import * as Rx from "rxjs/Rx";

Rx.Observable.fromEvent(document, "click")
  .filter((c: MouseEvent) => {
    return (c.clientX > window.innerWidth / 2);
  })
  .take(10)
  .subscribe((c: MouseEvent) => {
    console.log(c.clientX, c.clientY);
  });

// old
// ============================================================
//
// let clicks = 0;
//
// document.body.addEventListener("click", (e) => {
//   registerClicks(e);
// });
//
// function registerClicks(e) {
//   if(clicks < 10) {
//     if(e.clientX > window.innerWidth / 2) {
//       console.log(e.clientX, e.clientY);
//       clicks += 1;
//     }
//   } else {
//     document.removeEventListener("click", registerClicks);
//   }
// }
