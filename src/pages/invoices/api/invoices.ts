import type { Inovice, InvoiceUser } from '../model'

import { INVOICE_PATH } from '@/entities/invoice'
import { http } from '@/shared/api'

interface InvoiceDTO {
  id: string
  user_id: string
  amount: number
  status: string
  created_at: string
  users: {
    id: string
    name: string | null
    email: string
  }
}

export const getInvoiceList = async (): Promise<Array<Inovice>> => {
  const list = await http.fetchData<Array<InvoiceDTO>>({ url: INVOICE_PATH, method: 'GET' })

  return list === null ? [] : list.map(invoiceMapDTO)
}

const invoiceMapDTO = ({ id, users: { email }, amount, status }: InvoiceDTO): Inovice => ({
  id,
  email,
  amount,
  status
})

export const createInvoice = async (userId: string): Promise<boolean> =>
  http.isSuccess({
    url: `${INVOICE_PATH}/generate/${userId}`,
    method: 'POST'
  })

export const getUsersForInvoice = async (): Promise<Array<InvoiceUser>> => {
  const list = await http.fetchData<Array<InvoiceUser>>({
    url: `${INVOICE_PATH}/users`,
    method: 'GET'
  })

  return list ?? []
}
