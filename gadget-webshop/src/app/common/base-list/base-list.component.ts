import { Component, Input, OnInit, Output, EventEmitter, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Entity } from 'src/app/model/entity';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})

export class BaseListComponent<GenericEntity extends Entity> implements OnInit {

  dataTemp: any = 'id';
  sortKey: string = 'id';
  direction: string = 'A...Z';

  @Input() entities: GenericEntity[] | null = [];
  @Input() columnDefinition: ColumnDefinition[] = [];
  @Input() filterPipe:string = "";
  @Input() extraButtons: ButtonDefinition[] = [];
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() routeBase: string = '';

  @Output() customButtonClicked: EventEmitter<CustomButtonEvent> = new EventEmitter();

  phrase: string = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  onClickSort(data: string): void {
    console.log(`onClickSort, data = ${data}`);
    if (this.dataTemp != data) {
      this.dataTemp = data;
      this.sortKey = data
      this.direction = "A...Z";
    } else {
      this.dataTemp = null;
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
