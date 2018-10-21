import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Office } from '../models/office.model';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {
  private officesURL = 'http://localhost:5000/api/offices';

  constructor(private http: HttpClient) { }

  getOffices(): Observable<Array<Office>> {
    return this.http.get<Array<Office>>(this.officesURL);
  }

  createOffice(model: Office):  Observable<Office> {
    return this.http.post<Office>(this.officesURL, model);
  }
}
