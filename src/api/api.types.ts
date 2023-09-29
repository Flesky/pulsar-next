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
  name: string
  vessel: string
  type: string
  MSISDN: string
  ICCID: string
  status: {
    online: boolean
    unbarred: boolean
  }
}

export interface Template {
  id: number
  name: string
}

export interface Tag extends Template {
  id: number
  name: string
}
