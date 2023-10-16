import { Component } from '@angular/core'
import { FieldArrayType, FormlyExtension, FormlyModule } from '@ngx-formly/core'
import { ButtonModule } from 'primeng/button'
import { NgForOf, NgIf } from '@angular/common'
import { faAdd, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'

@Component({
  selector: 'app-formly-array-type',
  standalone: true,
  imports: [ButtonModule, NgForOf, NgIf, FormlyModule, FontAwesomeModule],
  template: `
    <div class="flex flex-col">
      <small
        class="text-danger"
        *ngIf="showError && formControl.errors"
      ></small>

      <ng-container *ngIf="field.fieldGroup?.length">
        <div class="flex flex-col gap-4">
          <div
            class="flex items-center justify-between gap-4"
            *ngFor="let field of field.fieldGroup; let i = index"
          >
            <formly-field class="grow" [field]="field"></formly-field>
            <button
              pButton
              type="button"
              class="p-button-danger shrink-0"
              (click)="remove(i)"
            >
              <fa-icon [icon]="faXmark"></fa-icon>
            </button>
          </div>
        </div>
      </ng-container>

      <button
        class="mt-0 flex w-full items-center justify-center gap-2"
        [class.!mt-4]="field.fieldGroup?.length"
        pButton
        type="button"
        (click)="add()"
      >
        <fa-icon [icon]="faAdd"></fa-icon> Add
      </button>
    </div>
  `,
})
export class ArrayTypeComponent
  extends FieldArrayType
  implements FormlyExtension
{
  protected readonly faAdd = faAdd
  protected readonly faXmark = faXmark
}
