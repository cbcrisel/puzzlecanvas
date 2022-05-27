import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  constructor(
    public _http:HttpClient,
    private _requestService: RequestService=new RequestService(_http)
  ) { }

  postPuzzle(formData:any) :Observable<any>{
    return this._requestService.post('puzzle',formData);
  }
  getPuzzle(): Observable<any>{
    return this._requestService.get('lastPuzzle');
  }
}
