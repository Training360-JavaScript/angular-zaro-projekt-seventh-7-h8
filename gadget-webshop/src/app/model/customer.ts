import { Address } from "./address";
import { Entity } from "./entity";

export class Customer extends Entity{
    firstName: string = '';
    lastName: string = '';
    email: string = '';
    address: Address = new Address();
    active: boolean = true;


}
