import { Component, Input, OnInit } from '@angular/core';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { Entity } from 'src/app/model/entity';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})

export class BaseListComponent<GenericEntity extends Entity> implements OnInit {

  @Input() entities:GenericEntity[] | null =[];
  @Input() columnDefinition: ColumnDefinition[] = [];
  @Input() title!: string;
  @Input() subTitle!: string;

  constructor() { }

  ngOnInit(): void { }

  isBooleanColumn(entity: any) {
    return typeof entity === 'boolean';
  }

  onCreate(){
    //TODO navigate to edit page with id=0 parameter
  }

  onEdit(entity:GenericEntity){
 
  }

  onDelete(entity:GenericEntity){
    //TODO call service
  }


}
