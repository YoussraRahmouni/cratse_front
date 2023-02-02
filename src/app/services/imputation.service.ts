import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imputation } from '../models/imputation';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {

  apiUrl = 'localhost:8080/users/idUser/projects/idProject/imputations/';
  imputationsUrl = '../../assets/mock-data/imputations.json';

  constructor(private http: HttpClient) { }

  getAllImputations() {
    //this.http.get<Imputation[]>(this.apiUrl+'imputations');
    return this.http.get<Imputation[]>(this.imputationsUrl);
  }
  addImputation(idProject: any, dailyCharge: any, date: Date): Observable<Imputation> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { dailyCharge, date };
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
}
