import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { FieldComponent } from '../shared/form/field.component'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { ApiService } from '../../api/api.service'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-new-template',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    FieldComponent,
    FormlyModule,
  ],
  providers: [ApiService],
  template: ` <form
    [formGroup]="form"
    class="dialog-form"
    (ngSubmit)="submit()"
  >
    <formly-form [form]="form" [model]="model" [fields]="fields"></formly-form>

    <div class="dialog-form-footer">
      <p-button type="submit" [loading]="loading">Save</p-button>
    </div>
  </form>`,
})
export class TemplateComponent {
  id: number | undefined
  loading = false
  refresh: (() => void) | undefined
  form = new FormGroup({})
  model = {
    Name: '',
  }
  fields: FormlyFieldConfig[] = [
    {
      key: 'Name',
      type: 'input',
      props: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
      },
    },
  ]

  constructor(
    config: DynamicDialogConfig,
    private api: ApiService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
  ) {
    if (config.data) {
      this.id = config.data.id
      this.refresh = config.data.refresh
      this.model = config.data.model
    }
  }

  submit() {
    this.loading = true
    this.api.saveTemplate(this.form.value, this.id).subscribe(() => {
      this.loading = false
      this.refresh?.()
      this.messageService.add({
        severity: 'success',
        summary: `Saved ${this.form.get('Name')?.value}`,
      })
      this.ref.close()
    })
  }
}
