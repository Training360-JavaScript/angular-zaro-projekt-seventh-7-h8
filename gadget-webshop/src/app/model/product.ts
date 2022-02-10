import { Entity } from "./entity";
export class Product extends Entity{
    name: string = '';
    type: string = '';
    catID: number = 0;
    description: string = '';
    price: number = 0;
    featured: boolean = true;
    active: boolean = true;
}
