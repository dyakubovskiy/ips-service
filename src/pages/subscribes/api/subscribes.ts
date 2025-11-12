import type { Subscribe } from '../model'

import { http } from '@/shared/api'

interface SubscribeDTO {
  id: string
  user_id: string
  tariff_id: string
  status: string
  created_at: string
  tariffs: {
    id: string
    name: string
    price: number
    created_at: string
    speed_mbps: number
    description?: string
  }
}

export const getSubscribeList = async (): Promise<Array<Subscribe>> => {
  const list = await http.fetchData<Array<SubscribeDTO>>({
    url: '/subscriptions/my',
    method: 'GET'
  })

  return list ? list.map(subscribeMapDTO) : []
}

const subscribeMapDTO = (dto: SubscribeDTO): Subscribe => ({
  id: dto.id,
  name: dto.tariffs.name,
  price: dto.tariffs.price,
  speed: dto.tariffs.speed_mbps,
  subscribeAt: dto.created_at
})
