import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IEmployee } from '../_models/employee.model';

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

  getAllEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.serviceUrl);
  }

  deleteEmployee(employeeId): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.serviceUrl + '/' + employeeId);
  }
}
