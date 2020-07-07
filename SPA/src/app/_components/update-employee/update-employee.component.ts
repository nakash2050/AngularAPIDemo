import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EmployeeService } from "src/app/_services/employee.service";
import {
  FormBuilder,
  NgForm,
  FormGroup,
  Validators,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
  FormArray,
} from "@angular/forms";
import { IEmployee } from "src/app/_models/employee.model";

@Component({
  selector: "app-update-employee",
  templateUrl: "./update-employee.component.html",
  styleUrls: ["./update-employee.component.css"],
})
export class UpdateEmployeeComponent implements OnInit {
  employeeId: string;

  designations = [
    { name: "Developer", value: "Developer" },
    { name: "Tester", value: "Tester" },
    { name: "Manager", value: "Manager" },
  ];

  updateForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateForm = this.buildUpdateForm();

    this.employeeId = this.route.snapshot.params["id"];

    this.employeeService.getEmployee(this.employeeId).subscribe((response) => {
      this.updateForm.patchValue(response);
    });
  }

  buildUpdateForm(): FormGroup {
    return this.fb.group({
      firstName: [null, [Validators.required, Validators.minLength(3)]],
      lastName: [null, [this.capitalsOnly(/[A-Z]+$/)]],
      designation: [null],
      addresses: this.fb.array([this.createAddressItem()])
    });
  }

  navigateBack(): void {
    this.router.navigate(["view-employees"]);
  }

  createAddressItem(): FormGroup {
    return this.fb.group({
      street: null,
      city: null,
      state: [null],
      zip: null
    })
  }

  onChange(form): void {
    console.log(form);
  }

  get Addresses(): FormArray {
    return <FormArray>this.updateForm.get('addresses');
  }

  addNewAddress(): void {
    const addressArray = <FormArray>this.updateForm.get('addresses');
    addressArray.push(this.createAddressItem());
  }

  updateEmployee(updateForm: FormGroup): void {
    const request = <IEmployee>updateForm.value;
    this.employeeService
      .updateEmployee(this.employeeId, request)
      .subscribe((response) => {
        if (response) {
          this.navigateBack();
        }
      });
  }

  capitalsOnly(inputValue: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      return !inputValue.test(control.value)
        ? {
          alphabetsOnly: {
              message: "The last name should be capitalized",
            },
          }
        : null;
    };
  }

  addAddressItem(): void {
    this.Addresses.push(this.createAddressItem());
  }

  deleteAddressItem(index: number): void {
    this.Addresses.removeAt(index);
  }
}
