import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEmployeeComponent } from './_components/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './_components/update-employee/update-employee.component';
import { ViewEmployeesComponent } from './_components/view-employees/view-employees.component';


const routes: Routes = [
  {
    path: 'add-employee',
    component: AddEmployeeComponent
  },
  {
    path: 'update-employee/:id',
    component: UpdateEmployeeComponent
  },
  {
    path: 'view-employees',
    component: ViewEmployeesComponent
  },
  {
    path: '**',
    redirectTo: 'add-employee'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
