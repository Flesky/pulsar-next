import { Component } from '@angular/core'
import { FieldType, FormlyModule } from '@ngx-formly/core'
import { NgForOf, NgIf } from '@angular/common'

@Component({
  selector: 'app-formly-object-type',
  standalone: true,
  imports: [FormlyModule, NgForOf, NgIf],
  template: `
    <div>
      <small class="text-danger">
        <formly-validation-message [field]="field"></formly-validation-message>
      </small>
      <div class="grid grow grid-cols-6 gap-3 md:grid-cols-12">
        <formly-field
          *ngFor="let f of field.fieldGroup"
          [field]="f"
        ></formly-field>
      </div>
    </div>
  `,
})
export class ObjectTypeComponent extends FieldType {}
