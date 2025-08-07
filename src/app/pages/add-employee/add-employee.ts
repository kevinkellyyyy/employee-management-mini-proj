import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeStateService } from '../../services/employee-state.service';
import { Employee } from '../../models/employee.model';
import { dummyJobGroups } from '../../data/dummy-data';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import moment from 'moment';

@Component({
  selector: 'app-add-employee',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
  providers: [
    provideMomentDateAdapter({
      parse: {
        dateInput: 'D MMMM YYYY',
      },
      display: {
        dateInput: 'D MMMM YYYY',
        monthYearLabel: 'D MMMM YYYY',
        dateA11yLabel: 'D MMMM YYYY',
        monthYearA11yLabel: 'D MMMM YYYY',
      },
    }),
  ],
})
export class AddEmployee {
  private fb = inject(FormBuilder);
  private employeeService = inject(EmployeeStateService);

  employeeForm: FormGroup;
  emailRegex = signal(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  jobGroups = signal(dummyJobGroups);
  today = signal(new Date());

  constructor() {
    this.employeeForm = this.fb.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegex())]],
      birthDate: ['', [Validators.required]],
      basicSalary: ['', [Validators.required, Validators.min(1)]],
      status: ['Aktif', [Validators.required]],
      group: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const formValue = this.employeeForm.value;

      const formattedDate = moment(formValue.birthDate).format('YYYY-MM-DD');

      const newEmployee: Employee = {
        ...formValue,
        birthDate: formattedDate,
        basicSalary: Number(formValue.basicSalary),
      };

      this.employeeService.add(newEmployee);
      window.history.back();
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onCancel() {
    window.history.back();
  }

  onSalaryInput(event: Event) {
    const input = (event.target as HTMLInputElement).value.replace(/\./g, '');
    const numericValue = Number(input.replace(/[^0-9]/g, ''));
    this.employeeForm.get('basicSalary')?.setValue(numericValue);
  }
}
