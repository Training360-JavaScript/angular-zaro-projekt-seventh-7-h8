import { Entity } from 'src/app/model/entity';
import { Status } from "./status";

export class Order extends Entity {
    [key: string]: any;
    customerID: number = 0;
    productID: number = 0;
    amount: number = 0;
    status: Status = Status.new;
}
