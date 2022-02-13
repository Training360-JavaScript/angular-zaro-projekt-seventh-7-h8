import { Status } from "./status";
import { Entity } from "./entity";
import { Customer } from "./customer";
import { Product } from "./product";

export class Order extends Entity{
    customerID: number = 0;
    productID: number = 0;
    amount: number = 0;
    status: Status = Status.new;
    customer: Customer = new Customer();
    product: Product = new Product();
}
