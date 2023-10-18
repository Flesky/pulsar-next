import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ButtonModule } from 'primeng/button'
import { FormGroup, ReactiveFormsModule } from '@angular/forms'
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog'
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core'
import { ApiService } from '../../api/api.service'
import { MessageService } from 'primeng/api'

@Component({
  selector: 'app-new-domain-filter',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
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
export class DomainFilterComponent {
  id: number | undefined
  loading = false
  refresh: (() => void) | undefined
  form = new FormGroup({})
  model = {
    Name: '',
    Description: '',
    Domains: [
      {
        Hostname: '',
      },
    ],
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
    {
      key: 'Description',
      type: 'textarea',
      props: {
        label: 'Description',
        placeholder: 'Enter description',
      },
    },
    {
      fieldGroup: [
        {
          template: `
            <hr class="my-2"/>
            <h3 class="font-semibold text-lg mt-4">Domains</h3>
          `,
        },
        {
          key: `Domains`,
          type: 'array',
          props: { required: true },
          fieldArray: {
            key: `Domain`,
            type: 'object',
            fieldGroup: [
              {
                key: `Hostname`,
                type: 'input',
                defaultValue: '',
                props: {
                  label: 'Host name',
                  required: true,
                  placeholder: 'www.example.com',
                },
                validators: {
                  validation: ['hostname'],
                },
              },
            ],
          },
        },
      ],
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
    if (this.form.valid) {
      this.loading = true
      this.api.saveDomainFilter(this.form.value, this.id).subscribe(() => {
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
}
