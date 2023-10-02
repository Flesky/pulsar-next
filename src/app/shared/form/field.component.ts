import { Component, Input } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-form-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="flex flex-col gap-2">
      <label [htmlFor]="for">{{ label }}</label>
      <ng-content />
      <div class="text-danger">{{ message }}</div>
    </div>
  `,
})
export class FieldComponent {
  @Input() for!: string
  @Input() label!: string
  @Input() message: string | undefined
}
