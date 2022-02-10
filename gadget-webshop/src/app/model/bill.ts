import { Entity } from 'src/app/model/entity';
import { Status } from "./status";

export class Bill extends Entity {
    [key: string]: any;
    orderID: number = 0;
    amount: number = 0;
    status: Status = Status.new;
}
