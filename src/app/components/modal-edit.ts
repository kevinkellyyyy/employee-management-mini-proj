import { Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../models/employee.model';
import { EmployeeStateService } from '../services/employee-state.service';
import { SpinnerIcon } from '../assets/svg/spinner-icon';

@Component({
  selector: 'app-modal-edit',
  standalone: true,
  imports: [SpinnerIcon],
  template: `
    <div class="flex flex-col gap-4 p-4">
      <h2 class="text-lg font-bold mb-2">Konfirmasi Edit Karyawan</h2>
      <p class="mb-4">
        Simpan perubahan untuk karyawan
        <span class="font-semibold">{{ userName() }}</span
        >?
      </p>
      <div class="flex flex-col md:flex-row gap-4 justify-end">
        <button
          type="submit"
          (click)="onCancel()"
          [disabled]="isLoading()"
          class="bg-gray-300 text-white px-6 py-2 rounded-lg hover:bg-secondary-blue disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Batal
        </button>
        <button
          type="submit"
          (click)="onConfirm()"
          [disabled]="isLoading()"
          class="bg-main-blue text-white px-6 py-2 rounded-lg hover:bg-secondary-blue disabled:opacity-50 ng:disabled-not-allowed"
        >
          <div class="flex gap-2">
            @if (isLoading()) {
            <div class="flex items-center gap-2">
              <app-spinner-icon />
              <p>Menyimpan Data</p>
            </div>
            } @else {
            <p>Ya, Simpan</p>
            }
          </div>
        </button>
      </div>
    </div>
  `,
})
export class ModalEdit {
  private employeeState: EmployeeStateService = inject(EmployeeStateService);
  userName = signal<string>('');
  isLoading = signal<boolean>(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Employee,
    private dialogRef: MatDialogRef<ModalEdit>
  ) {
    this.userName.set(data?.username ?? '');
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onConfirm() {
    this.isLoading.set(true);
    setTimeout(() => {
      this.dialogRef.close(true);
      this.isLoading.set(false);
    }, 1000);
  }
}
