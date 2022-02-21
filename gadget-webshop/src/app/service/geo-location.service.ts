import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { CoordinateModel } from '../model/coordinate-model';
import { MapGeocoder } from '@angular/google-maps';

@Injectable({
  providedIn: 'root'
})
export class GeoLocationService {

  private _localStorage: Storage = localStorage;

  getCoords(city: string): Observable<CoordinateModel> {
    const storedCoord = this._localStorage.getItem(`${city}_coords`);
    if (storedCoord) {
      const returnData: CoordinateModel = JSON.parse(storedCoord);
      return of(returnData);
    } else {
      return this.geocoder.geocode({
        address: city
      }).pipe(
        map(data => {
          const ret = { lat: '', lng: '' };
          if (data.status === 'OK') {
            ret.lat = data.results[0].geometry.location.lat().toString();
            ret.lng = data.results[0].geometry.location.lng().toString();
          }
          if(data.status !== 'OVER_QUERY_LIMIT') {
            this._localStorage.setItem(`${city}_coords`, JSON.stringify(ret));
          }
          return ret;
        })
      );

    }
  }

  constructor(
    private geocoder: MapGeocoder
  ) { }
}
