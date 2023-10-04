import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import {
  MockApiResult,
  Product,
  Products,
  Service,
  Template,
} from './mock.types'
import { TableLazyLoadEvent } from 'primeng/table'
import { FilterMetadata } from 'primeng/api'
import { Observable } from 'rxjs'

@Injectable()
export class MockService {
  protected readonly url: string = 'https://dummyjson.com/'
  constructor(private http: HttpClient) {}

  buildMockQuery(state: TableLazyLoadEvent) {
    const query = `skip=${state.first}&limit=${state.rows}`
    const searchValue = (state.filters?.['search'] as FilterMetadata)?.['value']
    return searchValue ? `/search?q=${searchValue}&${query}` : `?${query}`
  }

  getProducts(state: TableLazyLoadEvent) {
    return this.http.get<Products>(
      'https://dummyjson.com/products' + this.buildMockQuery(state),
    )
  }

  getProduct(id: number) {
    return this.http.get<Product>('https://dummyjson.com/products/' + id)
  }

  get<T extends Record<string, any>>(
    state: TableLazyLoadEvent,
    factory: (i: number) => T,
  ) {
    const searchValue = (state.filters?.['search'] as FilterMetadata)?.['value']
    const sortField = state.sortField as string | undefined
    let data: T[] = [...Array(128)].map((_, i) => {
      return factory(i + 1)
    })
    if (searchValue)
      data = data.filter((row) =>
        Object.values(row).some((value) =>
          String(value)
            .toLowerCase()
            .includes(String(searchValue).toLowerCase()),
        ),
      )
    if (sortField)
      data = data.sort((a, b) => {
        if (typeof a[sortField! as string] === 'number') {
          return a[sortField] - b[sortField] * (state.sortOrder ?? 1)
        } else {
          return (
            String(a[sortField]).localeCompare(String(b[sortField])) *
            (state.sortOrder ?? 1)
          )
        }
      })
    return new Observable<MockApiResult<T>>((subscriber) => {
      setTimeout(
        () => {
          subscriber.next({
            data: data.slice(state.first, state.first! + state.rows!),
            pagination: {
              total: data.length,
              page: state.first! / state.rows! + 1,
              limit: state.rows!,
            },
          })
          subscriber.complete()
        },
        Math.random() * 500 + 1000,
      )
    })
  }

  getById<T extends Record<string, any>>(res: T) {
    return new Observable<T>((subscriber) => {
      setTimeout(
        () => {
          subscriber.next(res)
          subscriber.complete()
        },
        Math.random() * 500 + 1000,
      )
    })
  }

  serviceFactory(id: number): Service {
    return {
      id,
      name: `${id}`,
      vessel: `${
        [
          'Scarlet Fire',
          'Glorious Morning',
          'Glorious Voyage',
          'Titanium Prime',
          'Grand Expedition',
          'Genesis Supernova',
          'Astral Observer',
          'Ocean Odyssey',
        ][id % 8]
      } ${Math.floor((id - 870776123148) / 8)}`,
      type: [
        'International Iridium Certus',
        'Inmarsat IP Data',
        'Inmarsat Fleet One/FBB',
        'Inmarsat Satellite Phone Service',
      ][id % 4],
      MSISDN: `${id}`,
      ICCID: `89883${12345 + id}`,
      ipAddresses: [`172.31.3.${id % 256}`, `172.31.4.${id % 256}`],
      status: {
        online: Math.random() > 0.5,
        unbarred: !!(id % 3),
      },

      package: 'Certus 700 L 30MB WS3 US',
      datePlanStarted: 'March 1, 2023 at 9:00 PM GMT+8',
      dateConnected: 'March 1, 2022 at 9:00 PM GMT+8',
    }
  }

  getServices(state: TableLazyLoadEvent) {
    return this.get<Service>(state, (i) =>
      this.serviceFactory(870776123155 + i),
    )
  }

  getService(id: number) {
    return this.getById<Service>(this.serviceFactory(id))
  }

  getTemplates(state: TableLazyLoadEvent) {
    return this.get<Template>(state, (i) => ({
      id: i,
      name: 'Template ' + i,
    }))
  }

  getTags(state: TableLazyLoadEvent) {
    return this.get<Template>(state, (i) => ({
      id: i,
      name: 'Tag ' + i,
    }))
  }
}
