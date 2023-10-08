export interface ProductInterface {
  id: number
  title: string
  amount: string
  price: number
  description: string
  favorite?: boolean
  discount?: boolean | string
  discountPer?: number
  discountUni: string
  imagen?: string
}
