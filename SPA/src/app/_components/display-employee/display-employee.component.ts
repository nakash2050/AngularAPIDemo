import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IEmployee } from 'src/app/_models/employee.model';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html',
  styleUrls: ['./display-employee.component.css']
})
export class DisplayEmployeeComponent implements OnInit {

  @Output() closeDisplayForm: EventEmitter<boolean> = new EventEmitter(false);
  @Input() employee: IEmployee;

  constructor() { }

  ngOnInit() {
  }

  closeForm(): void {
    this.closeDisplayForm.emit(true);
  }

}
