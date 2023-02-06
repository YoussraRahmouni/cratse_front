import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imputation } from '../models/imputation';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ImputationService {


  constructor(private http: HttpClient, private baseService: BaseService) { }

  API_URL = this.baseService.API_URL;
  HTTP_OPTIONS = this.baseService.HTTP_OPTIONS

  // Endpoint /users/{userId}/imputations
  getAllImputationsOfUser(idUser:any) {
    
    return this.http.get<Imputation[]>(this.API_URL+'users/'+idUser+'/imputations',this.HTTP_OPTIONS);
  }
  getAllImputations() {
    //this.http.get<Imputation[]>(this.apiUrl+'imputations');
    return this.http.get<Imputation[]>(this.API_URL);
  }
  // endpoint users/{userId}/projects/{projectId}/imputations
  addImputation(idProject: any, dailyCharge: any, date: Date): Observable<Imputation> {
    const body = { 
      "dateImputation":date.toString(), 
      "dailyChargeImputation":dailyCharge.toString()
    };
    return this.http.put<any>(this.API_URL+'users/'+localStorage.getItem('ID')+'/projects/'+idProject+'/imputations', body, this.HTTP_OPTIONS);
  }
}
