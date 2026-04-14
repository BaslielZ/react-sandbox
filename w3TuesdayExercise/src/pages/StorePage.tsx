import {useState, useEffect} from 'react'
import { useProductStore } from '../store/useProductStore'
import { ProductCard } from '../components/ProductCard'
import { CategoryFilter} from '../components/CategoryFilter'
import {Modal} from '../components/Modal'

export function StorePage(){
    const products = useProductStore((state) => state.products)
    const cart = useProductStore((state) => state.cart)
    const clearCart = useProductStore((state) => state.clearCart)
    const fetchProducts = useProductStore((state) => state.fetchProducts)
    const isLoading = useProductStore((state) => state.isLoading)

    const [isOpen, setIsOpen] = useState(false)

    const [filterType, setFilterType] = useState<'all' | 'fragrances' | 'furniture' | 'groceries' | 'beauty' | 'laptops'>('all')
    const filteredProducts = filterType === 'all' ? products : products.filter(product => product.category === filterType)

    useEffect(() => {
        fetchProducts()
    },[fetchProducts])

    if (isLoading){
        return <p className=' p-4 text-7xl'>Loading...</p>
    }

    const totalPrice = cart.reduce((total, product) => total + product.price, 0)
    return (
        <div className='p-2 flex flex-col justify-center items-center'>
            <h1 className='p-2 my-4 text-5xl'>Digital Store</h1>
                <CategoryFilter categories={['all', 'fragrances', 'furniture', 'groceries', 'beauty', 'laptops']} selected={filterType} onSelect={(category) => setFilterType(category as 'all' | 'fragrances' | 'furniture' | 'groceries' | 'beauty')} />
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center mt-4">  
            {filteredProducts.length == 0 ? 
            (<p className='text-3xl mt-10'>No products found.</p> )
            : (filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            )))}
            </div>
            <div className='fixed flex justify-between items-center bottom-0 py-2 px-16 text-white h-24 w-full bg-zinc-600'>
                <section className='flex flex-col gap-2'>
                    <p className='uppercase font-bold'>In Cart</p>
                    <p className='text-2xl'>{cart.length} items</p>
                </section>

                <div className='flex gap-4'>
                    <section className='flex flex-col gap-2'>
                        <p className='uppercase font-bold'>Total</p>
                        <p className='text-2xl'>€ {totalPrice}</p>
                        
                    </section>
                    <button onClick={() => cart.length > 0 && setIsOpen(true)} className='p-2 bg-blue-500 rounded text-xl'>Checkout</button>
                </div>
            </div>


            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ul className='flex flex-col gap-2'>
                    {cart.map(product => (
                        <div className='flex justify-between text-lg border-b' key={product.id}>
                            <span className=''>{(product.title).slice(0, 18)}... </span>
                            <span className='font-bold'>€ {product.price.toFixed(2)}</span>
                        </div>
                    ))}
                </ul>
                
                <div className='flex justify-between items-center mt-6'>
                    <p className='font-bold text-xl'>Total: </p>
                    <p className='font-bold text-xl'>€ {totalPrice.toFixed(2)}</p>
                </div>

                <button onClick={() => {alert('Order successful!')
                    setIsOpen(false)
                    clearCart()

                }} className='w-full p-2 mt-2 text-white font-bold bg-green-500'>Confirm Payment</button>
            </Modal>
        </div>
    )
}