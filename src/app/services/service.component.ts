import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TabViewModule } from 'primeng/tabview'
import { MockService } from '../../api/mock.service'
import { Service } from '../../api/mock.types'
import { DynamicDialogConfig } from 'primeng/dynamicdialog'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TabViewModule],
  template: `
    <p-tabView>
      <p-tabPanel header="Summary">
        <dl>
          <dt>Service ID</dt>
          <dd>{{ data?.id }}</dd>
          <dt>MSISDN</dt>
          <dd>{{ data?.MSISDN }}</dd>
          <dt>ICCID</dt>
          <dd>{{ data?.ICCID }}</dd>
          <dt>IP Addresses</dt>
          <dd>{{ data?.ipAddresses }}</dd>
        </dl>
        <hr class="my-4" />
        <dl>
          <dt>Package</dt>
          <dd>{{ data?.package }}</dd>
          <dt>Date Plan Started</dt>
          <dd>{{ data?.datePlanStarted }}</dd>
          <dt>Date Connected</dt>
          <dd>{{ data?.dateConnected }}</dd>
        </dl>
      </p-tabPanel>
      <p-tabPanel header="Groups & Profiles">
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui.</p>
      </p-tabPanel>
      <p-tabPanel header="IP Addresses">
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
      </p-tabPanel>
    </p-tabView>
  `,
})
export class ServiceComponent implements OnInit {
  data: Service | undefined
  id: number
  loading = true

  constructor(
    private config: DynamicDialogConfig,
    private api: MockService,
  ) {
    this.id = config.data.id
  }

  ngOnInit() {
    this.api.getService(this.id).subscribe((res) => {
      this.data = res
      this.loading = false
    })
  }
}
