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
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerIcon } from '../../assets/svg/spinner-icon';

@Component({
  selector: 'app-add-employee',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatFormFieldModule,
    SpinnerIcon,
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
  private router = inject(Router);
  private employeeService = inject(EmployeeStateService);
  private snackBar = inject(MatSnackBar);

  employeeForm: FormGroup;
  emailRegex = signal(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  jobGroups = signal(dummyJobGroups);
  today = signal(new Date());
  isLoading = signal(false);

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
      this.isLoading.set(true);
      const formValue = this.employeeForm.value;

      const formattedDate = moment(formValue.birthDate).format('YYYY-MM-DD');

      const newEmployee: Employee = {
        ...formValue,
        birthDate: formattedDate,
        basicSalary: Number(formValue.basicSalary),
      };

      setTimeout(() => {
        this.isLoading.set(false);
        this.employeeService.add(newEmployee);

        // Show success snackbar
        this.snackBar.open('Karyawan berhasil ditambahkan!', 'Tutup', {
          duration: 5000,
        });

        this.router.navigate(['/']); // pakai ini agar kembali ke halaman utama dengan reset params karena ada data baru paling atas
      }, 1000);
    } else {
      this.employeeForm.markAllAsTouched();
    }
  }

  onCancel() {
    window.history.back();
  }

  // untuk membuat tampilan pada form lebih user-friendly (input 10000000 -> 10.000.000)
  // ketik char lain tidak akan mengubah nilai pada form hanya terima angka
  onSalaryInput(event: Event) {
    const input = (event.target as HTMLInputElement).value.replace(/\./g, '');
    const numericValue = Number(input.replace(/[^0-9]/g, ''));
    this.employeeForm.get('basicSalary')?.setValue(numericValue);
  }
}
