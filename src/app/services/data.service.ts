import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { catchError, retry } from 'rxjs/operators';
import {HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import {MyData, Response} from '../models/models';

@Injectable()
export class DataService {
   //jsonURL: string = "http://127.0.0.1:8000/php/getJson.php?json=";
  URL: string = "http://127.0.0.1:8008/";
  display: boolean = false;

  constructor(private http: HttpClient){}

  getHttpJSON() {
      return this.http.get<MyData>(this.URL);
  }

  send(response: Response): Observable<MyData>{
     let myHeaders = new HttpHeaders();
     myHeaders.append('Content-Type', 'application/json');
     return this.http.post<MyData>(this.URL, response, { headers: myHeaders});
  }


}
