import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Entity } from 'src/app/model/entity';

let dataTemp: any;
@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})

export class BaseListComponent<GenericEntity extends Entity> implements OnInit {

  sortKey: string = '';
  direction: string = '';

  @Input() entities: GenericEntity[] | null = [];
  @Input() columnDefinition: ColumnDefinition[] = [];
  @Input() extraButtons: ButtonDefinition[] = [];
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() routeBase: string = '';

  @Output() customButtonClicked: EventEmitter<CustomButtonEvent> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  onClickSort(data: string): void {
    console.log(`onClickSort, data = ${data}`)
    console.log(this.entities)
    if (dataTemp != data) {
      dataTemp = data;
      this.sortKey = data
      this.direction = "A...Z";
    } else {
      dataTemp = null;
      this.sortKey = data
      this.direction = "Z...A";
    }
  }

  isBooleanColumn(entity: any) {
    return typeof entity === 'boolean';
  }

  onCreate(){
    //TODO navigate to edit page with id=0 parameter
  }

  onGoToDetailPage(entitiy: GenericEntity){
    //TODO navigate to detail page
  }

  onEdit(entity:GenericEntity){
    const entityid: number = entity.id;
    this.router.navigate([`/${this.routeBase}/edit`, entityid]);
  }

  onDelete(entity:GenericEntity){
    //TODO call service
  }

  onCustomButtonClicked(icomingEventID: string, entity: GenericEntity): void {
    const eventData: CustomButtonEvent = {
      eventID: icomingEventID,
      entityID: entity.id
    };
    this.customButtonClicked.emit(eventData);
  }

}
