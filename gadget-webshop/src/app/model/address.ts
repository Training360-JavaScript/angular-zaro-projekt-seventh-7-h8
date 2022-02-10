import { Entity } from 'src/app/model/entity';
export class Address extends Entity {
    [key: string]: any;
    zip: number = 0;
    country: string = '';
    city: string = '';
    street: string = '';
    notes: string = '';
}
