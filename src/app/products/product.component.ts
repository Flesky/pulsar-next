import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { ApiService } from '../../api/api.service';
import { Product } from '../../api/api.types';

@Component({
  selector: 'app-selected-product',
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
        <p>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
          aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos
          qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit,
          sed quia non numquam eius modi.
        </p>
      </p-tabPanel>
      <p-tabPanel header="Header III">
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus.
        </p>
      </p-tabPanel>
    </p-tabView>
  `,
})
export class ProductComponent implements OnInit {
  data: Product | undefined;
  id: number;
  loading = true;

  constructor(
    private config: DynamicDialogConfig,
    private api: ApiService,
  ) {
    this.id = config.data.id;
  }

  ngOnInit() {
    this.api.getProduct(this.id).subscribe((res) => {
      this.data = res;
      this.loading = false;
    });
  }
}
