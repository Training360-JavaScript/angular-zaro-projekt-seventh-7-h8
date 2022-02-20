import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { LoadingService } from './service/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'gadget-webshop';
  public showLoader: boolean = false;

  private loaderTimer: any;

  constructor(
    private loadingService: LoadingService
  ){ }

  ngOnInit() {
    this.listenToLoading();
  }

  listenToLoading(): void {
    this.loadingService.isLoading
      .pipe(delay(0))
      .subscribe((loading) => {
        if (!loading) {
          if (this.loaderTimer) {
            clearTimeout(this.loaderTimer);
            this.loaderTimer = undefined;
          }
          this.showLoader = false;
        } else {
          if (!this.loaderTimer) {
            this.loaderTimer = setTimeout(() => {
              this.showLoader = loading;
            }, 100);
          }
        }
      });
  }

}
