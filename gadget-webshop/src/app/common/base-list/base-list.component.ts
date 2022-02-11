import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/model/entity';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent<GenericEntity extends Entity> implements OnInit {

  @Input() entities:GenericEntity[] | null =[];

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
