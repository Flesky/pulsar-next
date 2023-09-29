import { Component, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TabViewModule } from 'primeng/tabview'
import { ApiService } from '../../api/api.service'
import { Product } from '../../api/api.types'
import { DynamicDialogConfig } from 'primeng/dynamicdialog'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, TabViewModule],
  template: `
    <p-tabView>
      <p-tabPanel header="Data Fetching">
        <p>
          {{ data | json }}
        </p>
      </p-tabPanel>
      <p-tabPanel header="Header II">
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem.</p>
      </p-tabPanel>
      <p-tabPanel header="Header III">
        <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui.</p>
      </p-tabPanel>
    </p-tabView>
  `,
})
export class ProductComponent implements OnInit {
  data: Product | undefined
  id: number
  loading = true

  constructor(
    private config: DynamicDialogConfig,
    private api: ApiService,
  ) {
    this.id = config.data.id
  }

  ngOnInit() {
    this.api.getProduct(this.id).subscribe((res) => {
      this.data = res
      this.loading = false
    })
  }
}
