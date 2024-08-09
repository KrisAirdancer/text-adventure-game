import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, provideHttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService
{
  private apiURL = 'http://localhost:3000/location?location_id=1'

  constructor(private http:HttpClient) {}

  getLocation(): Observable<any> {
    console.log("AT: getLocation()")
    let result = this.http.get(this.apiURL);
    // console.log(result);
    return result;
  }
}
