import { Status } from "./status";

export class Bill {
    [key: string]: any;
    id: number = 0;
    orderID: number = 0;
    amount: number = 0;
    status: Status = Status.new;
}
