import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core'
import { NgIf, NgTemplateOutlet } from '@angular/common'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    ProgressSpinnerModule,
    NgIf,
    ButtonModule,
    NgTemplateOutlet,
  ],
  template: `
    <p-table
      (onLazyLoad)="get.emit($event)"
      [paginator]="true"
      [showJumpToPageDropdown]="true"
      [rowsPerPageOptions]="[10, 20, 50, 100]"
      [showPageLinks]="false"
      [lazy]="true"
      [loading]="loading"
      [showLoader]="false"
      [rowHover]="true"
      [value]="data"
      [rows]="10"
      [totalRecords]="totalRecords"
    >
      <ng-template pTemplate="caption">
        <div class="flex items-center justify-between">
          <p-columnFilter
            type="text"
            field="search"
            [showMenu]="false"
            placeholder="Type to search"
          ></p-columnFilter>
          <div class="flex items-center gap-4">
            <p-progressSpinner
              class="h-8 w-8"
              styleClass="!h-8 !w-8"
              strokeWidth="6"
              *ngIf="loading"
            ></p-progressSpinner>

            <ng-template #defaultAction>
              <button (click)="create.emit()" pButton class="p-success">
                New {{ itemName }}
              </button>
            </ng-template>
            <ng-container
              *ngTemplateOutlet="
                action || (create.observed ? defaultAction : null)
              "
            ></ng-container>
          </div>
        </div>
      </ng-template>
      <ng-template pTemplate="header">
        <ng-container *ngTemplateOutlet="header"></ng-container>
      </ng-template>
      <ng-template pTemplate="body" let-row>
        <ng-container *ngTemplateOutlet="body; context: { $implicit: row }">
          ></ng-container
        >
      </ng-template>
    </p-table>
  `,
})
export class TableComponent implements OnInit {
  @Input({ required: true }) data: any[] = []
  @Input({ required: true }) totalRecords = 0
  @Input({ required: true }) loading = false
  @Output() get = new EventEmitter<TableLazyLoadEvent>()
  @Input() itemName = 'item'
  @Output() create = new EventEmitter<void>()

  @ContentChild('action') action: TemplateRef<never> | undefined
  @ContentChild('header') header!: TemplateRef<any>
  @ContentChild('body') body!: TemplateRef<any>

  ngOnInit() {
    if (!this.get.observed)
      throw new Error('TableComponent requires a get listener')
  }
}
