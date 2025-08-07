import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { EmployeeStateService } from '../../services/employee-state.service';
import { Employee } from '../../models/employee.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { dummyJobGroups } from '../../data/dummy-data';
import { CurrencyIdPipe } from '../../pipes/currency-id.pipe';
import { BirthdateIdPipe } from '../../pipes/birthdate-id.pipe';
import { AddIcon } from '../../assets/svg/add-icon';
import { EditIcon } from '../../assets/svg/edit-icon';
import { DeleteIcon } from '../../assets/svg/delete-icon';
import { FilterIcon } from '../../assets/svg/filter-icon';
import { CloseIcon } from '../../assets/svg/close-icon';

@Component({
  selector: 'app-employee-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    CurrencyIdPipe,
    BirthdateIdPipe,
    AddIcon,
    FilterIcon,
    EditIcon,
    DeleteIcon,
    CloseIcon,
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.scss',
})
export class EmployeeList implements OnInit {
  private employeeState: EmployeeStateService = inject(EmployeeStateService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  employees = signal<Employee[]>([]);
  dataSource = new MatTableDataSource<Employee>([]);
  searchTerm = signal('');
  searchBy = signal<keyof Employee | 'fullName'>('username');
  page = signal(1);
  size = signal(10);
  sortBy = signal('');
  filterJobGroup = signal('');
  showFilter = signal(false);
  tempAllEmployees = signal<Employee[]>([]);

  jobGroups = signal(dummyJobGroups);
  displayedColumns = signal<string[]>([
    'username',
    'name',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'jobGroup',
    'actions',
  ]);

  @ViewChild(MatPaginator) paginator?: MatPaginator;

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.searchTerm.set(params['search'] ?? '');
      this.searchBy.set(params['searchBy'] ?? 'username');
      this.page.set(params['page'] ? +params['page'] : 1);
      this.size.set(params['size'] ? +params['size'] : 10);
      this.sortBy.set(params['sortBy'] ?? '');
      this.filterJobGroup.set(params['jobGroup'] ?? '');
      this.employeeState.employees$.subscribe((list) => {
        this.tempAllEmployees.set(list);
        this.applySearch();
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator ?? null;
    if (this.paginator) {
      this.paginator.page.subscribe((event) => {
        this.page.set(event.pageIndex);
        this.size.set(event.pageSize);
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {
            page: event.pageIndex,
            size: event.pageSize,
            search: this.searchTerm(),
            searchBy: this.searchBy(),
          },
          queryParamsHandling: 'merge',
        });
      });
    }
  }

  toggleFilter() {
    this.showFilter.set(!this.showFilter());
  }

  onSortOrFilterChange() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm(),
        searchBy: this.searchBy(),
        sortBy: this.sortBy(),
        jobGroup: this.filterJobGroup(),
        page: this.page(),
        size: this.size(),
      },
      queryParamsHandling: 'merge',
    });
    this.applySearch();
  }

  editEmployee(username: string) {
    // Navigate to edit page or open a dialog for editing
    console.log('Edit employee:', username);
    // Implement navigation or dialog logic here
  }

  deleteEmployee(username: string) {
    this.employeeState.delete(username);
  }

  handleRowClick(row: Employee) {
    this.router.navigate(['/detail', row.username], {
      relativeTo: this.route,
    });
  }

  onSearchChange() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.searchTerm(),
        searchBy: this.searchBy(),
      },
      queryParamsHandling: 'merge',
    });
    this.applySearch();
  }

  applySearch() {
    this.page.set(1); // Reset to first page on search
    this.size.set(10); // Reset to default size
    let filtered = this.tempAllEmployees();
    const term = this.searchTerm().trim().toLowerCase();

    if (term) {
      filtered = filtered.filter((emp: Employee) => {
        if (this.searchBy() === 'fullName') {
          return (emp.firstName + ' ' + emp.lastName)
            .toLowerCase()
            .includes(term);
        }
        const value = emp[this.searchBy() as keyof Employee];
        return value && value.toString().toLowerCase().includes(term);
      });
    }

    if (this.filterJobGroup()) {
      filtered = filtered.filter((emp) => emp.group === this.filterJobGroup());
    }

    switch (this.sortBy()) {
      case 'name':
        filtered = filtered
          .slice()
          .sort((a, b) =>
            (a.firstName + ' ' + a.lastName).localeCompare(
              b.firstName + ' ' + b.lastName
            )
          );
        break;
      case 'salary':
        filtered = filtered
          .slice()
          .sort((a, b) => b.basicSalary - a.basicSalary);
        break;
      case 'birthYear':
        filtered = filtered
          .slice()
          .sort(
            (a, b) =>
              new Date(a.birthDate).getFullYear() -
              new Date(b.birthDate).getFullYear()
          );
        break;
    }

    this.employees.set(filtered);
    this.dataSource.data = filtered;
  }
}
