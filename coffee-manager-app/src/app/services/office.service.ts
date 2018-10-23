import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Office } from '../models/office.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(private http: HttpClient) { }

  getOffices(): Observable<Array<Office>> {
    return this.http.get<Array<Office>>(`${environment.apiUrl}offices`);
  }

  createOffice(model: Office):  Observable<Office> {
    return this.http.post<Office>(`${environment.apiUrl}offices`, model);
  }
}
