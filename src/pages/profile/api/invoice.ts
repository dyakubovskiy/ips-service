import type { Invoice } from '../model'

import { INVOICE_PATH } from '@/entities/invoice'
import { http } from '@/shared/api'

interface InvoiceDTO {
  id: string
  user_id: string
  amount: number
  status: string
  created_at: string
}

export const getMyInvoices = async (): Promise<Array<Invoice>> => {
  const list = await http.fetchData<Array<InvoiceDTO>>({ method: 'GET', url: `${INVOICE_PATH}/my` })

  return list === null ? [] : list.map(invoiceMapDTO)
}

const invoiceMapDTO = ({ id, amount, created_at }: InvoiceDTO): Invoice => ({
  id,
  amount,
  createdAt: created_at
})
