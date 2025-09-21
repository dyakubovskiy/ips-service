import { http } from '@/shared/api'

interface TariffDTO {
  id: string
  name: string
  description: string | null
  price: number | null
  speed_mbps: number | null
  created_at: string | null
}

export interface Tariff {
  id: string
  name: string
  desc: string | null
  price: number | null
  speed: number | null
}

export const getTariffList = async (): Promise<Array<Tariff>> => {
  const list = await http.fetchData<Array<TariffDTO>>({
    url: '/tariffs'
  })

  return list !== null ? list.map(tariffMapDTO) : []
}

const tariffMapDTO = ({ id, name, description, price, speed_mbps }: TariffDTO): Tariff => {
  return {
    id,
    name,
    desc: description,
    price,
    speed: speed_mbps
  }
}
