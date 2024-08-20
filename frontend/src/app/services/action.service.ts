import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionService
{
  constructor(private http:HttpClient) {}
  
  postAction(actionId: any): Observable<any>
  {
    console.log("AT: postAction()")

    return this.http.post(`http://localhost:3000/action?actionId=${actionId}`, '');
  }
}
