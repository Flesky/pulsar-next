import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { TemplateComponent } from './template.component'
import { ButtonModule } from 'primeng/button'
import { DynamicDialogDefaults } from '../../utils/defaults'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { Template } from '../../api/api.model'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ApiService } from '../../api/api.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ConfirmPopupModule,
  ],
  providers: [ApiService, DialogService, ConfirmationService],
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
          <td>{{ row.Name }}</td>
          <td>
            <div class="row-actions">
              <button class="p-button-outlined" pButton (click)="edit(row)">
                Edit
              </button>
              <button
                class="p-button-outlined p-button-danger"
                pButton
                (click)="delete(row)"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>

    <p-confirmPopup></p-confirmPopup> `,
})
export class TemplatesComponent {
  lastState: TableLazyLoadEvent | undefined
  data: Template[] = []
  totalRecords = 0
  loading = true
  dialog: DynamicDialogRef | undefined

  constructor(
    private apiService: ApiService,
    private dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {}

  get(state: TableLazyLoadEvent | undefined = undefined) {
    if (state) this.lastState = state
    state ||= this.lastState
    this.loading = true
    this.apiService.getTemplates(state!).subscribe((res) => {
      const { Templates, Summary } = res
      const { filteredCount } = Summary
      this.data = Templates
      this.totalRecords = filteredCount
      this.loading = false
    })
  }

  show(row: Template | undefined) {
    !row ? this.create() : this.edit(row)
    this.dialog?.onClose.subscribe(() => this.get())
  }

  create() {
    this.dialog = this.dialogService.open(TemplateComponent, {
      data: {
        refresh: () => this.get(),
      },
      header: 'Create template',
      ...DynamicDialogDefaults,
    })
  }

  edit(row: Template) {
    this.dialog = this.dialogService.open(TemplateComponent, {
      data: {
        id: row.id,
        refresh: () => this.get(),
        model: {
          Name: row.Name,
        },
      },
      header: 'Edit ' + row.Name,
      ...DynamicDialogDefaults,
    })
  }

  delete({ id, Name }: Template) {
    this.confirmationService.confirm({
      target: event!.target as EventTarget,
      message: `Are you sure you want to delete ${Name}?`,
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.apiService.deleteTemplate(id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: `Deleted ${Name}`,
          })
          this.get()
        })
      },
    })
  }
}
