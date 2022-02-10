import { Entity } from "./entity";

export class Address extends Entity {
    zip: number = 0;
    country: string = '';
    city: string = '';
    street: string = '';
    notes: string = '';
}
