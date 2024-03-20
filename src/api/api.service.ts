import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TableLazyLoadEvent } from 'primeng/table'
import {
  Form,
  GetActionLog,
  GetDomainFilters,
  GetFirewallProfiles,
  GetTags,
  GetTemplates,
  IdOrUndefined,
} from './api.model'
import { FilterMetadata } from 'primeng/api'
import { AccountNumberService } from '../app/core/account-number.service'

@Injectable()
export class ApiService {
  // Remember to also change the URL in main.ts
  apiUrl = 'https://devpulsarapi.smsglobal.net'

  constructor(
    private http: HttpClient,
    private accountNumber: AccountNumberService,
  ) {}

  // https://stackoverflow.com/questions/52797992/which-rxjs-operator-to-choose-to-handle-http-errors-tap-or-catcherror
  // intercept(req: HttpRequest<any>, next: HttpHandler) {
  //   return next.handle(req).pipe(
  //     tap({
  //       next: () => {},
  //       error: (err: HttpErrorResponse) => {
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error',
  //           detail: err.message,
  //         })
  //       },
  //     }),
  //   )
  // }

  buildQuery(query: string) {
    return `${this.apiUrl}/api/${this.accountNumber.get()}/${query}`
  }

  buildGetQuery(query: string, state: TableLazyLoadEvent) {
    const url = new URL(this.buildQuery(query))
    url.searchParams.append('page_size', String(state.rows))
    url.searchParams.append('page', String(state.first! / state.rows! + 1))
    const searchQuery = (state.filters?.['search'] as FilterMetadata)?.['value']
    if (searchQuery) {
      url.searchParams.append('search', searchQuery)
    }
    if (state.sortField) {
      url.searchParams.append('sort', state.sortField as string)
      url.searchParams.append('order', state.sortOrder! > 0 ? 'asc' : 'desc')
    }
    return url.href
  }

  // Templates
  getTemplates(state: TableLazyLoadEvent) {
    return this.http.get<GetTemplates>(this.buildGetQuery('templates', state))
  }

  saveTemplate(form: Form, id: IdOrUndefined) {
    return !id
      ? this.http.post(this.buildQuery('templates'), form)
      : this.http.put(`${this.buildQuery(`templates/${id}`)}`, form)
  }

  deleteTemplate(id: number) {
    return this.http.delete(`${this.buildQuery(`templates/${id}`)}`)
  }

  // Tags
  getTags(state: TableLazyLoadEvent) {
    return this.http.get<GetTags>(this.buildGetQuery('tags', state))
  }

  saveTag(form: Form, id: IdOrUndefined) {
    return !id
      ? this.http.post(this.buildQuery('tags'), form)
      : this.http.put(`${this.buildQuery(`tags/${id}`)}`, form)
  }

  deleteTag(id: number) {
    return this.http.delete(`${this.buildQuery(`tags/${id}`)}`)
  }

  // Firewall Profiles
  getFirewallProfiles(state: TableLazyLoadEvent) {
    return this.http.get<GetFirewallProfiles>(
      this.buildGetQuery('Firewall/Profiles', state),
    )
  }

  saveFirewallProfile(form: Form, id: IdOrUndefined) {
    return !id
      ? this.http.post(this.buildQuery('Firewall/Profiles'), form)
      : this.http.put(`${this.buildQuery(`Firewall/Profiles/${id}`)}`, form)
  }

  deleteFirewallProfile(id: string) {
    return this.http.delete(`${this.buildQuery('Firewall/Profiles')}/${id}`)
  }

  // Domain Filters
  getDomainFilters(state: TableLazyLoadEvent) {
    return this.http.get<GetDomainFilters>(
      this.buildGetQuery('DomainFilter/Profiles', state),
    )
  }

  saveDomainFilter(form: Form, id: IdOrUndefined) {
    return !id
      ? this.http.post(this.buildQuery('DomainFilter/Profiles'), form)
      : this.http.put(`${this.buildQuery(`DomainFilter/Profiles/${id}`)}`, form)
  }

  deleteDomainFilter(id: string) {
    return this.http.delete(`${this.buildQuery('DomainFilter/Profiles')}/${id}`)
  }

  // Action Log
  getActionLog(state: TableLazyLoadEvent) {
    return this.http.get<GetActionLog>(this.buildGetQuery('Activities', state))
  }
}
