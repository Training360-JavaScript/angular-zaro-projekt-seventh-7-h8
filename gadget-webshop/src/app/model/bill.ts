import { Status } from "./status";
import { Entity } from "./entity";
import { Order } from "./order";

export class Bill extends Entity{
	  orderID: number = 0;
    amount: number = 0;
    status: Status = Status.new;
    order?: Order
}
