import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';
import { dummyEmployees } from '../data/dummy-data';

const STORAGE_KEY = 'employees';

function loadEmployees(): Employee[] {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return dummyEmployees;
    }
  }
  return dummyEmployees;
}

@Injectable({ providedIn: 'root' })
export class EmployeeStateService {
  private employeesSubject = new BehaviorSubject<Employee[]>(loadEmployees());
  employees$ = this.employeesSubject.asObservable();

  delete(username: string) {
    const updated = this.employeesSubject.value.filter(
      (e) => e.username !== username
    );
    this.employeesSubject.next(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }

  add(employee: Employee) {
    const current = this.employeesSubject.value;
    const updated = [employee, ...current];
    this.employeesSubject.next(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
}
