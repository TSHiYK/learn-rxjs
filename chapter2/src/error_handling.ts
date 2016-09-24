import {Observable} from "rxjs";

function getJSON(arr) {
  return Observable.from(arr).map((str: any) => {
    let parsedJSON = JSON.parse(str);
    return parsedJSON;
  });
}

// getJSON([
//   '{"1": 1, "2": 2}',
//   '{"success" true}', // invalid
//   '{"enabled": true}'
// ]).subscribe(
//   json => {
//     `Parsed JSON: ${json}`
//   },
//   error => {
//     console.log(error.message);
//   }
// );

const caught = getJSON(['{"1": 1, "2": 2}', '{"1: 1}'])
  .catch(
    <any>Observable.of({
      error: "There was an error parsing JSON"
    })
  );

caught.subscribe(
  json => {
    `Parsed JSON: ${json}`;
  },
  error => {
    console.log(error.message);
  }
);

