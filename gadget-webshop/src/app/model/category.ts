import { Entity } from 'src/app/model/entity';
export class Category extends Entity {
    [key: string]: any;
    name: string = '';
    description: string = '';
}
