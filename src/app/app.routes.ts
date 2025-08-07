import { Routes } from '@angular/router';
import { EmployeeList } from './pages/employee-list/employee-list';
import { AddEmployee } from './pages/add-employee/add-employee';
import { DetailEmployee } from './pages/detail-employee/detail-employee';
import { AuthGuard } from './guards/auth.guard';
import { Login } from './pages/login/login';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EmployeeList,
    canActivate: [AuthGuard],
  },
  {
    path: 'new-employee',
    component: AddEmployee,
    canActivate: [AuthGuard],
  },
  {
    path: 'detail/:id',
    component: DetailEmployee,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: Login,
      },
    ],
  },
];
