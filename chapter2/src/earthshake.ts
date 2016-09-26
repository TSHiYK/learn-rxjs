import {Observable} from "rxjs/Observable";
import "rxjs";
declare var L: any; // Leaflet

interface Quake {
  type: string;
  geometry: {
    coordinates: string;
  };
  id: string;
  properties: {
    mag: number;
    code: string;
  };
}

const QUAKE_URL = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp";

const loadJSONP = (url: string) => {
  let script = document.createElement("script");
  script.src = url;

  let head = document.getElementsByTagName("head")[0];
  head.appendChild(script);
};

const map: any = L.map("map").setView([33.858631, -118.279602], 7);
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(map);

const quakes = Observable
  .interval(5000)
  .mergeMap<any>(() => {
    return Observable.create(observer => {
      (<any>window).eqfeed_callback = response => {
        observer.next(response);
        observer.complete();
      };
      loadJSONP(QUAKE_URL);
    });
  })
  .mergeMap(response => Observable.from(response.features));
// .distinct((quake1: Quake, quake2: Quake) => quake1.properties.code === quake2.properties.code);

quakes.subscribe((quake: Quake) => {
  let coords = quake.geometry.coordinates;
  let size = quake.properties.mag * 10000;

  L.circle([coords[1], coords[0]], size).addTo(map);
});
