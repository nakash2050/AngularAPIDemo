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

  getEmployee(id: string): Observable<IEmployee> {
    return this.httpClient.get<IEmployee>(this.serviceUrl + '/' + id);
  }

  addEmployee(request: any): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.serviceUrl, request);
  }

  getAllEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.serviceUrl);
  }

  deleteEmployee(employeeId): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.serviceUrl + '/' + employeeId);
  }

  updateEmployee(employeeId: string, request: IEmployee): Observable<boolean> {
    return this.httpClient.put<boolean>(this.serviceUrl + '/' + employeeId, request);
  }
}
