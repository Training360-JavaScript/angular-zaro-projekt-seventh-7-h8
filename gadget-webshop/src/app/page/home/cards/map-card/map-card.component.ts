import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MapData } from 'src/app/model/map-data';
import { Order } from 'src/app/model/order';
import { GeoLocationService } from 'src/app/service/geo-location.service';
import {MapInfoWindow, MapMarker} from '@angular/google-maps';

@Component({
  selector: 'app-map-card',
  templateUrl: './map-card.component.html',
  styleUrls: ['./map-card.component.scss']
})
export class MapCardComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @Input() orders!: Order[];

  public dataArr: MapData[] = [];

  public center: google.maps.LatLngLiteral = {lat: 	47.116386, lng: -101.299591};
  public markerOptions: google.maps.MarkerOptions = {draggable: false};
  public zoom = 3;
  public infoContent:string = '';
  public heatmapData: google.maps.LatLngLiteral[] = [];
  public heatmapOptions = {radius: 35};


  constructor(
    private geoCoder: GeoLocationService
  ) { }

  ngOnInit(): void {
    const cities = this.orders.map(order => `${order['customer.address.city']}, ${order['customer.address.country']}`).filter((item, i, ar) => ar.indexOf(item) === i);
    cities.forEach(city => {
     const orderNum = this.orders.filter(order => city === `${order['customer.address.city']}, ${order['customer.address.country']}`) .length;
     const dataItem: MapData = {
       city: city,
       count: orderNum || 0,
       coordinates: {lat: 0, lng: 0}
     };
     //this.dataArr.push(dataItem);

      this.geoCoder.getCoords(city).forEach(resp => {
        if (resp.lat !== '' && resp.lng !== '') {
          dataItem.coordinates.lat = +resp.lat;
          dataItem.coordinates.lng = +resp.lng;
          this.dataArr.push(dataItem);
          for(let i = 0;i<dataItem.count; i+= 1) {
            this.heatmapData.push({lat: dataItem.coordinates.lat, lng: dataItem.coordinates.lng});
          }
        }
      });
    });
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = (event?.latLng?.toJSON()) || {lat: 	47.116386, lng: -101.299591};
  }

  openInfoWindow(marker: MapMarker, data: MapData) {
    this.infoContent = `${data.count} orders from ${data.city}`;
    this.infoWindow?.open(marker);
  }

}
