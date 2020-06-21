import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  serviceUrl: string = environment.baseApiUrl + 'employee';

  constructor(private httpClient: HttpClient) { 

  }

  addEmployee(request: any): Observable<boolean> {
    return this.httpClient.post<boolean>(this.serviceUrl, request);
  }
}
