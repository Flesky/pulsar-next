import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Product, Products, Service, Template } from './api.types'
import { TableLazyLoadEvent } from 'primeng/table'
import { FilterMetadata } from 'primeng/api'
import { Observable } from 'rxjs'

@Injectable()
export class ApiService {
  protected readonly url: string = 'https://dummyjson.com/'
  constructor(private http: HttpClient) {}

  buildMockQuery(state: TableLazyLoadEvent) {
    const query = `skip=${state.first}&limit=${state.rows}`
    const searchValue = (state.filters?.['search'] as FilterMetadata)?.['value']
    return searchValue ? `/search?q=${searchValue}&${query}` : `?${query}`
  }

  generateMock<T extends object>(
    state: TableLazyLoadEvent,
    factory: (i: number) => T,
  ) {
    const searchValue = (state.filters?.['search'] as FilterMetadata)?.['value']
    const data = [...Array(128)]
      .map((_, i) => factory(i + state.first!))
      .filter(
        (row) =>
          !searchValue ||
          Object.values(row).some((value) =>
            String(value)
              .toLowerCase()
              .includes(String(searchValue).toLowerCase()),
          ),
      )
    return new Observable<{
      data: T[]
      pagination: {
        total: number
        page: number
        limit: number
      }
    }>((subscriber) => {
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

  getProducts(state: TableLazyLoadEvent) {
    return this.http.get<Products>(
      'https://dummyjson.com/products' + this.buildMockQuery(state),
    )
  }

  getProduct(id: number) {
    return this.http.get<Product>('https://dummyjson.com/products/' + id)
  }

  getServices(state: TableLazyLoadEvent) {
    return this.generateMock<Service>(state, (i) => ({
      id: i,
      name: `${870776123155 + i}`,
      vessel: `${
        [
          'Scarlet Fire',
          'Glorious Morning',
          'Glorious Voyage',
          'Titanium Prime',
          'Clarity Explorer',
          'Genesis Supernova',
          'Astral Observer',
          'Oceanic Odyssey',
        ][i % 8]
      } ${Math.floor(i / 8) + 1}`,
      type: [
        'International Iridium Certus',
        'Inmarsat IP Data',
        'Inmarsat Fleet One/FBB',
        'Inmarsat Satellite Phone Service',
      ][Math.floor(i / 32) % 4],
      MSISDN: `${870776123155 + i}`,
      ICCID: `898830000000${10000 + i}`,
      status: {
        online: !!(i % 3),
        unbarred: !!(i % 2),
      },
    }))
  }

  getTemplates(state: TableLazyLoadEvent) {
    return this.generateMock<Template>(state, (i) => ({
      id: i,
      name: 'Template ' + i,
    }))
  }

  getTags(state: TableLazyLoadEvent) {
    return this.generateMock<Template>(state, (i) => ({
      id: i,
      name: 'Tag ' + i,
    }))
  }
}
