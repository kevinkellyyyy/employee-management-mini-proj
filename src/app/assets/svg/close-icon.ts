import { Component } from '@angular/core';

@Component({
  selector: 'app-close-icon',
  standalone: true,
  template: ` <svg
    class="h-5 w-5 text-red-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <circle cx="12" cy="12" r="10" stroke-width="1.5" />
    <path
      d="M14.5 9.50002L9.5 14.5M9.49998 9.5L14.5 14.5"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>`,
})
export class CloseIcon {}
