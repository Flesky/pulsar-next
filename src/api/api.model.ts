export interface Summary {
  page: number
  page_size: number
  size: number
  filteredCount: number
}

export type Id = number | undefined
export type Form = Record<string, any>

export interface Template {
  id: number
  Account: string
  Name: string
  created_at: string
  updated_at: string
}

export interface GetTemplates {
  Templates: Template[]
  Summary: Summary
}
