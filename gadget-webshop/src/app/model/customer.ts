import { Entity } from 'src/app/model/entity';
import { Address } from "./address";

export class Customer extends Entity {
    [key: string]: any;
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    address: Address = new Address();
    active: boolean = true;


}
