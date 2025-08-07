import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeStateService } from '../../services/employee-state.service';
import { CurrencyIdPipe } from '../../pipes/currency-id.pipe';
import moment from 'moment';

@Component({
  selector: 'app-detail-employee',
  imports: [],
  templateUrl: './detail-employee.html',
  styleUrl: './detail-employee.scss',
})
export class DetailEmployee {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private employeeState: EmployeeStateService = inject(EmployeeStateService);

  tableData = signal<{ label: string; value: string | number }[]>([]);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    this.employeeState.employees$.subscribe((list) => {
      const foundEmployee = list.find((e) => e.username === id);
      if (foundEmployee) {
        this.tableData.set([
          { label: 'Username', value: foundEmployee.username },
          { label: 'Nama Depan', value: foundEmployee.firstName },
          { label: 'Nama Belakang', value: foundEmployee.lastName },
          { label: 'Email', value: foundEmployee.email },
          {
            label: 'Tanggal Lahir',
            value: moment(foundEmployee.birthDate).format('D MMMM YYYY'),
          },
          {
            label: 'Gaji Pokok',
            value: this.formatSalary(foundEmployee.basicSalary),
          },
          { label: 'Status', value: foundEmployee.status },
          { label: 'Grup Pekerjaan', value: foundEmployee.group },
          { label: 'Deskripsi', value: foundEmployee.description },
        ]);
      }
    });
  }

  formatSalary(salary: number | string): string {
    const currencyPipe = new CurrencyIdPipe();
    return currencyPipe.transform(salary);
  }

  goBack() {
    window.history.back();
  }
}
