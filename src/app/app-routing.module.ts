import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ServicesComponent } from './services/services.component'
import { TemplatesComponent } from './templates/templates.component'
import { TagsComponent } from './tags/tags.component'
import { ProductsComponent } from './products/products.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/services',
  },
  {
    path: 'products',
    component: ProductsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'templates',
    component: TemplatesComponent,
  },
  {
    path: 'tags',
    component: TagsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
