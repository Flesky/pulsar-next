export interface MockApiResult<T extends object> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
  }
}

export interface Products {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

export interface Service {
  id: number
  name: string
  vessel: string
  type: string
  MSISDN: string
  ICCID: string
  ipAddresses: string[]
  status: {
    online: boolean
    unbarred: boolean
  }

  package: string
  datePlanStarted: string
  dateConnected: string
}

export interface Template {
  id: number
  name: string
}

export interface Tag extends Template {
  id: number
  name: string
}
