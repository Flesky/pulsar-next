import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { DashboardComponent } from './dashboard/dashboard.component'
import { ServicesComponent } from './services/services.component'
import { TemplatesComponent } from './templates/templates.component'
import { TagsComponent } from './tags/tags.component'
import { FirewallComponent } from './firewall/firewall.component'
import { DomainFiltersComponent } from './domain-filter/domain-filters.component'
import { ActionLogComponent } from './action-log/action-log.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
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
  {
    path: 'firewall',
    component: FirewallComponent,
  },
  {
    path: 'domain-filter',
    component: DomainFiltersComponent,
  },
  {
    path: 'action-log',
    component: ActionLogComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
