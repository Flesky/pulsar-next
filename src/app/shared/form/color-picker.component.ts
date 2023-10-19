import { Component } from '@angular/core'
import { FieldType, FormlyModule } from '@ngx-formly/core'
import { JsonPipe } from '@angular/common'
import { ColorSketchModule } from 'ngx-color/sketch'
import { ColorCircleModule } from 'ngx-color/circle'

@Component({
  selector: 'app-formly-object-type',
  standalone: true,
  imports: [ColorSketchModule, FormlyModule, ColorCircleModule, JsonPipe],
  template: `
    <div class="p-field">
      <label [for]="id">{{ field.props?.label }}</label>
      <color-circle
        [color]="formControl.value"
        (onChangeComplete)="($event)"
      ></color-circle>
      <small class="text-danger">
        <formly-validation-message [field]="field"></formly-validation-message>
      </small>
    </div>
  `,
})
export class ColorPickerComponent extends FieldType {
  updateColor(color: string) {
    console.log(color)
    this.formControl.setValue(color)
  }
}
