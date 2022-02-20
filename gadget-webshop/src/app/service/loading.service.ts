import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _isLoading$  = new BehaviorSubject<boolean>(false);
  private loadingMap: Map<string, boolean> = new Map<string, boolean>();
  public isLoading = this._isLoading$.asObservable()

  constructor() { }

  setLoading(loading: boolean, url: string): void {
    if (!url) return;
    if (loading === true) {
      this.loadingMap.set(url, loading);
      this._isLoading$.next(true);
    }else if (loading === false && this.loadingMap.has(url)) {
      this.loadingMap.delete(url);
    }
    if (this.loadingMap.size === 0) {
      this._isLoading$.next(false);
    }
  }

}
