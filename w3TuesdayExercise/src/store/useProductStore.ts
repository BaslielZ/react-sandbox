import { create } from 'zustand'

export interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number

  dimensions: Dimensions

  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string

  reviews: Review[]

  returnPolicy: string
  minimumOrderQuantity: number

  meta: Meta

  images: string[]
  thumbnail: string
}

export interface Dimensions {
  width: number
  height: number
  depth: number
}

export interface Review {
  rating: number
  comment: string
  date: string
  reviewerName: string
  reviewerEmail: string
}

export interface Meta {
  createdAt: string
  updatedAt: string
  barcode: string
  qrCode: string
}

export interface ProductStoreState {
    products: Product[]
    fetchProducts: () => Promise<void>
    isLoading:boolean
}


export const useProductStore = create<ProductStoreState>((set) => ({
    products: [],
    isLoading: true,
    fetchProducts: async () => {
        try {
            const response = await fetch('https://dummyjson.com/products')
            const data = await response.json()
            set({products: data.products})
        } catch (err){
            console.error(err)
        } finally{
            set({isLoading: false})
        }
    }
}))