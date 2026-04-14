import { useEffect, useState } from 'react'
import {useAuthStore} from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'
import {addProduct} from '../services/adminApi'

export function AdminDashboard(){
    //if token is null, redirect to login
    const token = useAuthStore((state) => state.token)
    const logout = useAuthStore((state) => state.logout)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (!token){
            navigate('/login')
        }
    }, [token, navigate])

    if (!token){ 
        return (
            <div className='min-h-screen flex items-center justify-center p-8 bg-red-100'>
                <div className='max-w-md w-full rounded-xl bg-red-600 text-white p-8 text-center shadow-lg'>
                    <h1 className='text-2xl font-bold mb-4'>You are not logged in</h1>
                    <p className='mb-6'>Redirecting to the homepage...</p>
                </div>
            </div>
        )
    }

    async function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault()
        if (!token) return null
        const product = await addProduct(title, parseFloat(price), token)
        setTitle('')
        setPrice('')
        if (product){
            alert('Product added with id ' + product.id)
            console.log('Product added!')
            console.log(product)
        }


    }
    return (
        <div className='min-h-screen bg-slate-100 p-8'>
            <div className='mx-auto max-w-4xl rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200'>
                <div className='flex flex-col gap-6 md:flex-row md:items-center md:justify-between'>
                    <div>
                        <h1 className='text-3xl font-semibold text-slate-900'>Admin Dashboard</h1>
                        <p className='mt-2 text-slate-500'>Manage products and store settings from one place.</p>
                    </div>
                    <button
                        onClick={logout}
                        className='inline-flex items-center justify-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700'
                    >
                        Logout
                    </button>
                </div>

                <section className='mt-10 rounded-[32px] border border-slate-200 bg-slate-50 p-6'>
                    <div className='mb-6'>
                        <h2 className='text-2xl font-semibold text-slate-900'>Add new product</h2>
                        <p className='mt-1 text-sm text-slate-500'>Add a product to the catalog and keep inventory up to date.</p>
                    </div>
                    <form action='' className='grid gap-4 sm:grid-cols-2' onSubmit={handleSubmit}>
                        <label className='space-y-2 text-sm text-slate-700'>
                            <span>Title</span>
                            <input
                                type='text'
                                placeholder='Product title'
                                className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </label>
                        <label className='space-y-2 text-sm text-slate-700'>
                            <span>Price</span>
                            <input
                                type='text'
                                placeholder='Product price'
                                className='w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </label>
                        <button className='sm:col-span-2 mt-2 rounded-2xl bg-blue-600 px-5 py-3 text-white font-semibold transition hover:bg-blue-700'>
                            Save product
                        </button>
                    </form>
                </section>
            </div>
        </div>
    )
}