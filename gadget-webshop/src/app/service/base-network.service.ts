import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Entity } from '../model/entity';

@Injectable({
  providedIn: 'root'
})
export class BaseNetworkService<GenericEntity extends Entity> {
  private backendURL:string = environment.backendURL;
  public endpoint:string = '';

  constructor(public http: HttpClient) { }

  getAll(): Observable<GenericEntity[]> {
    return this.http.get<GenericEntity[]>(`${this.backendURL}${this.endpoint}`);
  }

  get(id: number): Observable<GenericEntity> {
    return this.http.get<GenericEntity>(`${this.backendURL}${this.endpoint}/${id}`);
  }

  create(entity: GenericEntity): Observable<GenericEntity> {
    return this.http.post<GenericEntity>(`${this.backendURL}${this.endpoint}`, entity);
  }

  update(entity: GenericEntity): Observable<GenericEntity> {
    return this.http.patch<GenericEntity>(`${this.backendURL}${this.endpoint}/${entity.id}`, entity);
  }

  delete(id: number): Observable<GenericEntity> {
    return this.http.delete<GenericEntity>(`${this.backendURL}${this.endpoint}/${id}`);
  }

}
