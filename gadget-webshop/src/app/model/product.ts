import { Entity } from 'src/app/model/entity';
export class Product extends Entity {
    [key: string]: any;
    name: string = '';
    type: string = '';
    catID: number = 0;
    description: string = '';
    price: number = 0;
    featured: boolean = true;
    active: boolean = true;
}
