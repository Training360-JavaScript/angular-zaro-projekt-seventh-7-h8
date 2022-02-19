import { Component, Input, OnInit, Output, EventEmitter, Pipe } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ButtonDefinition } from 'src/app/model/button-definition';
import { ColumnDefinition } from 'src/app/model/column-definition';
import { CustomButtonEvent } from 'src/app/model/custom-button-event';
import { Entity } from 'src/app/model/entity';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ListColumnSelectorComponent } from '../list-column-selector/list-column-selector.component';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})

export class BaseListComponent<GenericEntity extends Entity> implements OnInit {

  @Input() entities: GenericEntity[] | null = [];
  @Input() columnDefinition: ColumnDefinition[] = [];
  @Input() actionButtons!: ButtonDefinition[];
  @Input() title!: string;
  @Input() subTitle!: string;
  @Input() enableNewButton: boolean = true;

  @Output() customButtonClicked: EventEmitter<CustomButtonEvent> = new EventEmitter();

  phrase: string = "";
  dataTemp: any = 'id';
  sortKey: string = 'id';
  direction: string = 'A...Z';

  public pageIndex:number = 0;
  public pageSize: number = 10;

  storedColumnDefinitionData$ = this.localStorageService.columnDefinitonData$;

  constructor(
    private dialog: MatDialog,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.localStorageService.getColumnVisibility(this.title);
    this.storedColumnDefinitionData$.subscribe(columnsReceived => {
      if (!columnsReceived || columnsReceived[0] === '(empty)') {
        this.columnDefinition.forEach(column => {
          column.visible = true;
        });
      } else {
        this.columnDefinition.forEach(column => {
          column.visible = columnsReceived.includes(column.column);
        });
      }
    });
  }

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
    const eventData: CustomButtonEvent = {
      eventID: 'CREATE',
      entityID: 0
    };
    this.customButtonClicked.emit(eventData);
  }

  onCustomButtonClicked(icomingEventID: string, entity: GenericEntity): void {
    const eventData: CustomButtonEvent = {
      eventID: icomingEventID,
      entityID: entity.id
    };
    this.customButtonClicked.emit(eventData);
  }

  handlePaginate(event?:PageEvent){
    if(!event) {
      this.pageIndex = 1;
      this.pageSize = 10;
    } else {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
  }

  onOpenColumnSelector(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.columnDefinition;
    const dialogRef = this.dialog.open(ListColumnSelectorComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(
      data => {
        this.localStorageService.setColumnVisibility(this.title, data);
      }
    );
  }

}
