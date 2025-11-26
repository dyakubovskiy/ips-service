import type { Inovice } from '../model'

import { http } from '@/shared/api'

const INVOICE_PATH = '/invoices'

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

export const createInvoice = async (
  userId: string = '0199f91b-67d1-7d2c-a9da-b9517a5ffe61'
): Promise<boolean> =>
  http.isSuccess({
    url: `${INVOICE_PATH}/generate/${userId}`,
    method: 'POST'
  })
