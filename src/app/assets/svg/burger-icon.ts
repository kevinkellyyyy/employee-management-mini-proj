import { Component } from '@angular/core';

@Component({
  selector: 'app-burger-icon',
  standalone: true,
  template: ` <svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    viewBox="0 0 24 24"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>`,
})
export class BurgerIcon {}
