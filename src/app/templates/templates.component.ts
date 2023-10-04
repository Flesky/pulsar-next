import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MockService } from '../../api/mock.service'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { TemplateComponent } from './template.component'
import { ButtonModule } from 'primeng/button'
import { DynamicDialogDefaults } from '../../utils/defaults'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { Template } from '../../api/mock.model'
import { ProgressSpinnerModule } from 'primeng/progressspinner'

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, ProgressSpinnerModule],
  providers: [MockService, DialogService],
  template: `<p-table
    (onLazyLoad)="get($event)"
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
          placeholder="Filter templates"
        ></p-columnFilter>
        <div class="flex items-center gap-4">
          <p-progressSpinner
            class="h-8 w-8"
            styleClass="!h-8 !w-8"
            strokeWidth="6"
            *ngIf="loading"
          ></p-progressSpinner>
          <button (click)="create()" pButton class="p-success">
            New template
          </button>
        </div>
      </div>
    </ng-template>
    <ng-template pTemplate="header">
      <tr>
        <th>Name</th>
        <th>Action</th>
      </tr>
    </ng-template>
    <ng-template pTemplate="body" let-row>
      <tr>
        <td>{{ row.name }}</td>
        <td>
          <button pButton (click)="edit(row)">Edit</button>
        </td>
      </tr>
    </ng-template>
  </p-table> `,
})
export class TemplatesComponent {
  data: Template[] = []
  totalRecords = 0
  loading = true
  dialog: DynamicDialogRef | undefined

  constructor(
    private apiService: MockService,
    private dialogService: DialogService,
  ) {}

  get(state: TableLazyLoadEvent) {
    this.loading = true
    this.apiService.getTemplates(state).subscribe((res) => {
      this.data = res.data
      this.totalRecords = res.pagination.total
      this.loading = false
    })
  }

  create() {
    this.dialog = this.dialogService.open(TemplateComponent, {
      header: 'Create template',
      ...DynamicDialogDefaults,
    })
  }

  edit(row: Template) {
    this.dialog = this.dialogService.open(TemplateComponent, {
      data: {
        id: row.id,
        form: {
          name: row.name,
        },
      },
      header: 'Edit ' + row.name,
      ...DynamicDialogDefaults,
    })
  }
}
