import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { TableLazyLoadEvent } from 'primeng/table'
import { Form, GetTemplates, Id } from './api.model'
import { MessageService } from 'primeng/api'

@Injectable()
export class ApiService {
  apiUrl = 'https://pulsarapi.passcess.net'
  accountNumber = 'AC123456'

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
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
    return `${this.apiUrl}/api/${this.accountNumber}/${query}`
  }

  buildPaginatedQuery(query: string, state: TableLazyLoadEvent) {
    // rows = page size, first / rows = page number
    const page = state.first! / state.rows! + 1
    return `${this.buildQuery(query)}?page_size=${state.rows}&page=${page}`
  }

  getTemplates(state: TableLazyLoadEvent) {
    return this.http.get<GetTemplates>(
      this.buildPaginatedQuery('templates', state),
    )
  }

  saveTemplate(form: Form, id: Id) {
    return !id
      ? this.http.post(this.buildQuery('templates'), form)
      : this.http.put(`${this.buildQuery('templates')}/${id}`, form)
  }

  deleteTemplate(id: Id) {
    return this.http.delete(`${this.buildQuery('templates')}/${id}`)
  }
}
