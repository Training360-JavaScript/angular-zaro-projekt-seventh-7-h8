import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleCommunicatiorService {

  private _titleCommunicator$ = new BehaviorSubject<string>('Dashboard');
  public titleCommunicator$ = this._titleCommunicator$.asObservable();

  constructor() { }

  public setTitle(title: string) {
    this._titleCommunicator$.next(title);
  }

}
