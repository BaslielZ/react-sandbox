import type { Product } from '../store/useProductStore'
import {useProductStore} from '../store/useProductStore'

interface ProductCardProps {
    product: Product
}
export function ProductCard({product}: ProductCardProps){
    const addToCart = useProductStore((state) => state.addToCart)
    return (
        <div className='p-4 shadow rounded-xl bg-gray-100 my-10 flex flex-col items-center'>
            <img src={product.thumbnail} alt={product.title} />
            <h2 className='text-2xl'>{product.title}</h2>
            <p className='text-xl font-bold'>€{product.price}</p>
            <button onClick={() => addToCart(product)} className='p-2 w-full bg-zinc-600 text-white rounded'>
                Add to Cart
            </button>
        </div>
    )
}