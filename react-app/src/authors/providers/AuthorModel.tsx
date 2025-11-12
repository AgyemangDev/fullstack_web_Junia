export type AuthorModel = {
  id: string
  firstName: string
  lastName: string
  biography?: string
  nationality?: string
  photo?: string
}

export type CreateAuthorModel = Omit<AuthorModel, 'id'>
