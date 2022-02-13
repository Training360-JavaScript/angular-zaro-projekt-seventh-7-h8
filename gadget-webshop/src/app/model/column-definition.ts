import { Alignment } from "./alignment";

export class ColumnDefinition {
    [key: string]: any;
    title: string = '';
    column: string = '';
    subcolumn?: string = '';
    alignment?: Alignment; 
    
    constructor(properties?: ColumnDefinition) {
        if (properties) {
            this.title = properties.title || '';
            this.column = properties.column || '';
            this.subcolumn = properties.subcolumn || '';
            this.alignment = properties.alignment ? properties.alignment : this.alignment;
        }
    }
}
