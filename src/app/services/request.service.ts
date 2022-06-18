import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Constants } from '../Constants';
import {Observable} from 'rxjs';
import { Utils } from '../Utils';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private headers= new HttpHeaders;
  private url=environment.server_url+'/api/';

  constructor(private _http:HttpClient) { 

  }
  setHeaders(){
    this.headers= new HttpHeaders()
    .set('Authorization',Utils.get(Constants.ACTUAL_ACCESS_TOKEN)??'')
  }
  post(prefixUrl: string, params: any = null): Observable<any> {
    this.setHeaders();
    return this._http.post(
      this.url + prefixUrl,
      params,
      { headers: this.headers }
    );
  }
  delete(prefixUrl: string, params: any = null): Observable<any> {
    this.setHeaders();
    return this._http.delete(
      this.url + prefixUrl,
      {headers: this.headers}
    );
  }
  get(prefixUrl: string): Observable<any>{
    this.setHeaders();
    return this._http.get(this.url+prefixUrl,{headers:this.headers});
  }
}
