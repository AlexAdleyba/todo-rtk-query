export type FieldError = {
  error: string
  field: string
}

export type Response<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
}
