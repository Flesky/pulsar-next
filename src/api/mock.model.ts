export interface MockApiResult<T extends object> {
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
  }
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
