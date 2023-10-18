import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ButtonModule } from 'primeng/button'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { Template } from '../../api/api.model'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ApiService } from '../../api/api.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { TableComponent } from '../shared/table/table.component'
import { DynamicDialogDefaults } from '../../utils/defaults'
import { TagComponent } from './tag.component'

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ConfirmPopupModule,
    TableComponent,
  ],
  providers: [ApiService, DialogService, ConfirmationService],
  template: `
    <p>Add/edit not working at the moment. Fixing.</p>

    <app-table
      [loading]="loading"
      [data]="data"
      [totalRecords]="totalRecords"
      [columns]="[{ name: 'Name' }, 'Actions']"
      (get)="get($event)"
      (create)="create()"
      itemName="tag"
    >
      <ng-template #header>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </ng-template>
      <ng-template #body let-row>
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
    </app-table>

    <p-confirmPopup></p-confirmPopup>
  `,
})
export class TagsComponent {
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
    this.apiService.getTags(state!).subscribe((res) => {
      const { Tags, Summary } = res
      const { filteredCount } = Summary
      this.data = Tags
      this.totalRecords = filteredCount
      this.loading = false
    })
  }

  create() {
    this.dialog = this.dialogService.open(TagComponent, {
      ...DynamicDialogDefaults,
      data: {
        refresh: () => this.get(),
      },
      header: 'Create tag',
    })
  }

  edit(row: Template) {
    this.dialog = this.dialogService.open(TagComponent, {
      ...DynamicDialogDefaults,
      data: {
        id: row.id,
        refresh: () => this.get(),
        model: {
          Name: row.Name,
        },
      },
      header: 'Edit ' + row.Name,
    })
  }

  delete({ id, Name }: Template) {
    this.confirmationService.confirm({
      target: event!.target as EventTarget,
      message: `Are you sure you want to delete ${Name}?`,
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.apiService.deleteTag(id).subscribe(() => {
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
