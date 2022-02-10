import { Status } from "./status";
import { Entity } from "./entity";

export class Order extends Entity{
    customerID: number = 0;
    productID: number = 0;
    amount: number = 0;
    status: Status = Status.new;
}
