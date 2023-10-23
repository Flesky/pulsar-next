import { Component } from '@angular/core'
import { FieldType, FormlyModule } from '@ngx-formly/core'
import { JsonPipe } from '@angular/common'
import { ColorSketchModule } from 'ngx-color/sketch'
import { ColorCircleModule } from 'ngx-color/circle'
import { ColorEvent } from 'ngx-color'

@Component({
  selector: 'app-formly-object-type',
  standalone: true,
  imports: [ColorSketchModule, FormlyModule, ColorCircleModule, JsonPipe],
  template: `
    <div class="p-field">
      <label [for]="id">{{ field.props?.label }}</label>
      <color-circle
        [color]="formControl.value"
        (onChangeComplete)="updateColor($event)"
        [colors]="[
          '#8D8D8D',
          '#000000',
          '#E5484D',
          '#D6409F',
          '#8E4EC6',
          '#3E63DD',
          '#0090FF',
          '#00A2C7',
          '#30A46C',
          '#AD7F58',
          '#F76B15'
        ]"
      ></color-circle>
      <small class="text-danger">
        <formly-validation-message [field]="field"></formly-validation-message>
      </small>
    </div>
  `,
})
export class ColorPickerComponent extends FieldType {
  updateColor(event: ColorEvent) {
    this.formControl.setValue(event.color.hex)
  }
}
