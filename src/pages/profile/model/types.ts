export interface Profile {
  email: string
  name: string | null
  address: string | null
}

export interface Invoice {
  id: string
  amount: number
  createdAt: string
}
