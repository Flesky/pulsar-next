import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ButtonModule } from 'primeng/button'
import { DynamicDialogDefaults } from '../../utils/defaults'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { DomainFilter } from '../../api/api.model'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ApiService } from '../../api/api.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { TableComponent } from '../shared/table/table.component'
import { TagModule } from 'primeng/tag'
import { DomainFilterComponent } from './domain-filter.component'

export interface Root {
  label: string
  protocol: number
  destPortRange: {
    from: number
    toInclusive: number
  }
  remoteAddresses: string[]
  displayPort: number
  parsedProtocol: string
}

@Component({
  selector: 'app-domain-filters',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    ProgressSpinnerModule,
    ConfirmPopupModule,
    TableComponent,
    TagModule,
  ],
  providers: [ApiService, DialogService, ConfirmationService],
  template: `
    <app-table
      [loading]="loading"
      [data]="data"
      [totalRecords]="totalRecords"
      [columns]="[{ name: 'Name' }, { name: 'Domains' }, 'Actions']"
      (get)="get($event)"
      (create)="create()"
      itemName="domain filter"
    >
      <ng-template #body let-row>
        <tr>
          <td>{{ row.label }}</td>
          <td>{{ row.domains.length }} rules</td>
          <td>
            <div class="row-actions">
              <!--              <button pButton (click)="view(row)">View</button>-->
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
export class DomainFiltersComponent {
  lastState: TableLazyLoadEvent | undefined
  data: DomainFilter[] = []
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
    this.apiService.getDomainFilters(state!).subscribe((res) => {
      const { Profiles, Summary } = res
      const { filteredCount } = Summary
      this.data = Profiles
      this.totalRecords = filteredCount
      this.loading = false
    })
  }

  // view(row: Template) {}

  create() {
    this.dialog = this.dialogService.open(DomainFilterComponent, {
      ...DynamicDialogDefaults,
      data: {
        refresh: () => this.get(),
      },
      header: 'Create domain filter',
    })
  }

  edit(row: DomainFilter) {
    this.dialog = this.dialogService.open(DomainFilterComponent, {
      ...DynamicDialogDefaults,
      data: {
        id: row.uid,
        refresh: () => this.get(),
        model: {
          Name: row.label,
          Description: row.customData.description,
          Domains: row.domains.map((d) => ({ Hostname: d })),
        },
      },
      header: 'Edit ' + row.label,
      width: '1200px',
    })
  }

  delete({ uid, label }: DomainFilter) {
    this.confirmationService.confirm({
      target: event!.target as EventTarget,
      message: `Are you sure you want to delete ${label}?`,
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.apiService.deleteDomainFilter(uid).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: `Deleted ${label}`,
          })
          this.get()
        })
      },
    })
  }
}
