import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  @Input() routeBase: string = '';

  constructor(
    private router: Router 
  ) { }

  ngOnInit(): void { }

  isBooleanColumn(entity: any) {
    return typeof entity === 'boolean';
  }

  onCreate(){
    //TODO navigate to edit page with id=0 parameter
  }

  onEdit(entity:GenericEntity){
    const entityid: number = entity.id;
    this.router.navigate([`/${this.routeBase}`, entityid]);
  }

  onDelete(entity:GenericEntity){
    //TODO call service
  }


}
