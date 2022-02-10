import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: any[] = [
    {
      id: 1,
      name: 'Sprouts - Corn',
      type: 'Masonry',
      catID: 4,
      description: 'Dilation of Ascending Colon, Percutaneous Approach',
      price: 72,
      featured: false,
      active: true,
    },
    {
      id: 2,
      name: 'Wonton Wrappers',
      type: 'Waterproofing & Caulking',
      catID: 2,
      description: 'Insert Intralum Dev in Inf Mesent Vein, Perc Endo',
      price: 35,
      featured: true,
      active: false,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
