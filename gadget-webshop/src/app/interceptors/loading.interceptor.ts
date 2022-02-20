import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, finalize, map, Observable } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingService: LoadingService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, req.url);
    return next.handle(req).pipe(
        finalize(() => this.loadingService.setLoading(false, req.url))
    );
}

}
