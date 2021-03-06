import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CountReport } from '../model/count-report';

@Injectable({
  providedIn: 'root'
})
export class CountReporterService {

  private _reportCount$ = new BehaviorSubject<CountReport>({listname: '', count: 0});
  public reportCount$ = this._reportCount$.asObservable();

  constructor() { }

  reportCount(listName: string, countVal: number) {
    this._reportCount$.next({listname: listName, count: countVal});
  }
}
