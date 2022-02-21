import { CoordinateModel } from "./coordinate-model";

export class MapData {
  city: string = '';
  count: number = 0;
  coords?: CoordinateModel;
  coordinates: google.maps.LatLngLiteral = {lat: 0, lng: 0}
}
