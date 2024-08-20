import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionService
{
  private BASE_URL = 'http://localhost:3000';

  constructor(private http:HttpClient) {}
  
  postAction(actionId: any): Observable<any>
  {
    console.log("AT: postAction()")

    return this.http.post(`${this.BASE_URL}/action?actionId=${actionId}`, "");
  }

  getInventoryAction(): Observable<any>
  {
    return this.http.get(`${this.BASE_URL}/inventory`);
  }
}
