import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog'
import { ButtonModule } from 'primeng/button'
import { DynamicDialogDefaults } from '../../utils/defaults'
import { TableLazyLoadEvent, TableModule } from 'primeng/table'
import { FirewallProfile } from '../../api/api.model'
import { ProgressSpinnerModule } from 'primeng/progressspinner'
import { ApiService } from '../../api/api.service'
import { ConfirmationService, MessageService } from 'primeng/api'
import { ConfirmPopupModule } from 'primeng/confirmpopup'
import { TableComponent } from '../shared/table/table.component'
import { TagModule } from 'primeng/tag'
import { ProfileComponent } from './profile.component'

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
  selector: 'app-firewall',
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
      (get)="get($event)"
      (create)="create()"
      itemName="firewall profile"
    >
      <ng-template #header>
        <tr>
          <th>Name</th>
          <th>Outbound</th>
          <th>Inbound</th>
          <th>Actions</th>
        </tr>
      </ng-template>
      <ng-template #body let-row>
        <tr>
          <td>{{ row.label }}</td>
          <td>
            <p-tag
              styleClass="leading-none mr-1"
              [severity]="
                row.outbound.defaultAction === 'allow' ? 'success' : 'danger'
              "
            >
              {{ row.outbound.defaultAction.toUpperCase() }}
            </p-tag>
            {{ row.outbound.exceptions.length }} exception{{
              row.outbound.exceptions.length !== 1 ? 's' : ''
            }}
          </td>
          <td>
            <p-tag
              styleClass="leading-none mr-1"
              [severity]="
                row.inbound.defaultAction === 'allow' ? 'success' : 'danger'
              "
            >
              {{ row.inbound.defaultAction.toUpperCase() }}
            </p-tag>
            {{ row.inbound.exceptions.length }} exception{{
              row.inbound.exceptions.length !== 1 ? 's' : ''
            }}
          </td>
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
export class FirewallComponent {
  lastState: TableLazyLoadEvent | undefined
  data: FirewallProfile[] = []
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
    this.apiService.getFirewallProfiles(state!).subscribe((res) => {
      const { Profile, Summary } = res
      const { filteredCount } = Summary
      this.data = Profile
      this.totalRecords = filteredCount
      this.loading = false
    })
  }

  // view(row: Template) {}

  create() {
    this.dialog = this.dialogService.open(ProfileComponent, {
      ...DynamicDialogDefaults,
      data: {
        refresh: () => this.get(),
      },
      header: 'Create firewall profile',
      width: '1200px',
    })
  }

  edit(row: FirewallProfile) {
    this.dialog = this.dialogService.open(ProfileComponent, {
      ...DynamicDialogDefaults,
      data: {
        id: row.uid,
        refresh: () => this.get(),
        model: {
          Name: row.label,
          Description: row.customData.description,
          OutboundDefault: row.outbound.defaultAction,
          OutboundExceptions: row.outbound.exceptions.map((item) => {
            return {
              OutboundPreset: item.parsedProtocol,
              OutboundProtocol: item.protocol,
              OutboundPortRange: item.displayPort,
              OutboundIPPrefix: item.remoteAddresses.join('\n'),
              OutboundDescription: item.label,
            }
          }),
          InboundDefault: row.inbound.defaultAction,
          InboundExceptions: row.inbound.exceptions.map((item) => {
            return {
              InboundPreset: item.parsedProtocol,
              InboundProtocol: item.protocol,
              InboundPortRange: item.displayPort,
              InboundIPPrefix: item.remoteAddresses.join('\n'),
              InboundDescription: item.label,
            }
          }),
        },
      },
      header: 'Edit ' + row.label,
      width: '1200px',
    })
  }

  delete({ uid, label }: FirewallProfile) {
    this.confirmationService.confirm({
      target: event!.target as EventTarget,
      message: `Are you sure you want to delete ${label}?`,
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.apiService.deleteFirewallProfile(uid).subscribe(() => {
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
