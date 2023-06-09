import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = 'http://localhost:8080/';
const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }),
  withCredentials: true
};
const HTTP_OPTIONS_PDF = {
  responseType: 'blob',
  headers: new HttpHeaders({
    'Content-Type': 'application/pdf',
    'Access-Control-Allow-Origin': '*'
  }),
  withCredentials: true
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  public API_URL = API_URL;
  public HTTP_OPTIONS = HTTP_OPTIONS;
  public HTTP_OPTIONS_PDF = HTTP_OPTIONS_PDF;

  constructor() { }
}
