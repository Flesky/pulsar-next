import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { FieldComponent } from '../shared/form/field.component'
import { DynamicDialogConfig } from 'primeng/dynamicdialog'

@Component({
  selector: 'app-new-tag',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FieldComponent,
  ],
  template: ` <form
    [formGroup]="form"
    class="dialog-form"
    (ngSubmit)="onSubmit()"
  >
    <div class="dialog-form-grid">
      <app-form-field for="name" label="Name" [message]="form.getError('name')">
        <input pInputText formControlName="name" />
      </app-form-field>
    </div>

    <div class="dialog-form-footer">
      <button pButton>Save</button>
    </div>
  </form>`,
})
export class TagComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
  })
  constructor(private config: DynamicDialogConfig) {
    if (config.data) this.form.setValue(config.data.form)
  }

  onSubmit() {
    console.log(this.form.value)
  }
}
