import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/_services/employee.service";
import { IEmployee } from "src/app/_models/employee.model";

@Component({
  selector: "app-view-employees",
  templateUrl: "./view-employees.component.html",
  styleUrls: ["./view-employees.component.css"],
})
export class ViewEmployeesComponent implements OnInit {
  employees: IEmployee[];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((response) => {
      this.employees = response;
    });
  }

  deleteEmployee(employeeId): void {
    this.employeeService.deleteEmployee(employeeId).subscribe((response) => {
      if (response) {
        const employees = this.employees.filter(emp => emp.id !== employeeId);
        this.employees = employees;
      }
    });
  }
}
