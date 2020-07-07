import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "src/app/_services/employee.service";
import { IEmployee } from "src/app/_models/employee.model";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent implements OnInit {
  employee: IEmployee = null;

  designations = [
    { name: "Developer", value: "Developer" },
    { name: "Tester", value: "Tester" },
    { name: "Manager", value: "Manager" },
  ];

  orderForm = {
    firstName: null,
    lastName: null,
    designation: null,
  };

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {}

  addEmployee(employeeDetails: NgForm): void {
    this.employeeService
      .addEmployee(employeeDetails.value)
      .subscribe((response) => {
        if (response) {
          this.employee = response;
          employeeDetails.reset();
        }
      });
  }

  onChange(formElement): void {
    console.log(formElement);
  }

  closeForm(isClose: boolean): void {
    console.log(isClose);
    if (isClose) {
      this.employee = null;
    }
  }
}
