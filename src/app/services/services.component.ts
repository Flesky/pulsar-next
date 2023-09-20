import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, TableModule],
  template: ` <p>services works!</p> `,
  styles: [],
})
export class ServicesComponent {}
