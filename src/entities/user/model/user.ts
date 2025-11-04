export interface User {
  id: string
  email: string
  name: string | null
  address: string | null
  role: string
  token: string
}

export interface AccessData {
  id: string
  role: string
  token: string
}

export interface VisualData {
  email: string
  name: string | null
  address: string | null
}
