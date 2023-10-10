// ID reference to determine whether to POST or PUT
export type Id = number | undefined
export type Form = Record<string, any>
// Contains pagination data
export interface Summary {
  page: number
  page_size: number
  size: number
  filteredCount: number
}

interface Item {
  id: number
  created_at: string
  updated_at: string
}

export interface Template extends Item {
  Account: string
  Name: string
}

export interface Tag extends Item {
  uuid: string
  Account: string
  Name: string
  Hex: string
}

export interface GetTemplates {
  Templates: Template[]
  Summary: Summary
}

export interface GetTags {
  Tags: Tag[]
  Summary: Summary
}
