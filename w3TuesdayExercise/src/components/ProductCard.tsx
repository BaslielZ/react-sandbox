import type { Product } from '../store/useProductStore'

interface ProductCardProps {
    product: Product
}
export function ProductCard({product}: ProductCardProps){
    return (
        <div className='p-4 shadow rounded-xl bg-gray-100 my-10 flex flex-col items-center'>
            <img src={product.thumbnail} alt={product.title} />
            <h2 className='text-2xl'>{product.title}</h2>
            <p className='text-xl font-bold'>€{product.price}</p>
        </div>
    )
}