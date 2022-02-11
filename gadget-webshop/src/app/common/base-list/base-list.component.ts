import { Component, Input, OnInit } from '@angular/core';
import { Entity } from 'src/app/model/entity';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent implements OnInit {

  @Input() entities:Entity[] =[];

  constructor() { }

  ngOnInit(): void {
  }

  onCreate(){
    //TODO navigate to edit page with id=0 parameter
  }

  onEdit(entity:Entity){
    //TODO navigate to edit page with :id parameter
  }

  onDelete(entity:Entity){
    //TODO call service
  }


}
