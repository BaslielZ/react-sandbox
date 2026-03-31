import {useState, useEffect} from 'react'
import { useProductStore } from '../store/useProductStore'
import { ProductCard } from '../components/ProductCard'
import { CategoryFilter} from '../components/CategoryFilter'

export function StorePage(){
    const products = useProductStore((state) => state.products)
    const fetchProducts = useProductStore((state) => state.fetchProducts)
    const isLoading = useProductStore((state) => state.isLoading)

    const [filterType, setFilterType] = useState<'all' | 'fragrances' | 'furniture' | 'groceries' | 'beauty'>('all')
    const filteredProducts = filterType === 'all' ? products : products.filter(product => product.category === filterType)

    useEffect(() => {
        fetchProducts()
    },[fetchProducts])

    if (isLoading){
        return <p className=' p-4 text-7xl'>Loading...</p>
    }
    return (
        <div className='p-2 flex flex-col justify-center items-center'>
            <h1 className='p-2 my-4 text-5xl'>Digital Store</h1>
                <CategoryFilter categories={['all', 'fragrances', 'furniture', 'groceries', 'beauty']} selected={filterType} onSelect={(category) => setFilterType(category as 'all' | 'fragrances' | 'furniture' | 'groceries' | 'beauty')} />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">  
            {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        </div>
    )
}