import { Status } from "./status";
import { Entity } from "./entity";
export class Bill extends Entity{
    orderID: number = 0;
    amount: number = 0;
    status: Status = Status.new;
}
