import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/model/entity';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})

// interface ColumnDefinition {
//   [key: string]: any;
//   title: string;
//   column: string;  
// };

export class BaseListComponent<GenericEntity extends Entity> implements OnInit {

  @Input() entities:GenericEntity[] | null =[];

/*   public columnDef: ColumnDefinition[] = [
    {
      title: 'ID',
      column: 'id',
    },
    {
      title: 'name',
      column: 'name'
    }
  ]; */

  constructor() { }

  ngOnInit(): void {
  }

  onCreate(){
    //TODO navigate to edit page with id=0 parameter
  }

  onEdit(entity:GenericEntity){
    //TODO navigate to edit page with :id parameter
  }

  onDelete(entity:GenericEntity){
    //TODO call service
  }


}
