import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { EmployeeService } from "src/app/_services/employee.service";

@Component({
  selector: "app-add-employee",
  templateUrl: "./add-employee.component.html",
  styleUrls: ["./add-employee.component.css"],
})
export class AddEmployeeComponent implements OnInit {
  isEmployeeAdded: boolean = false;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {}

  addEmployee(employeeDetails: NgForm): void {
    this.employeeService
      .addEmployee(employeeDetails.value)
      .subscribe((response) => {
        if (response) {
          this.isEmployeeAdded = true;
          employeeDetails.reset();
        }
      });
  }

  onChange(formElement): void {
    console.log(formElement);
  }
}
