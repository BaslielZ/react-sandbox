import { useState} from 'react'
import {loginAdmin} from '../services/adminApi'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'

export function AdminLogin(){
    const login = useAuthStore((state) => state.login)
    const navigate = useNavigate()
    const [username, setUsername] = useState('emilys')
    const [password, setPassword] = useState('emilyspass')


    async function handleLogin(e: React.SyntheticEvent){
        e.preventDefault()
        const dataToken = await loginAdmin(username, password)
        if (dataToken){
            login(dataToken)
            navigate('/admin')
        }
        
    }
    return (
        <div className="mt-20 p-4 flex flex-col justify-center items-center">
            <form action="" onSubmit={handleLogin} className="flex flex-col w-[40%] gap-4 border border-blue-600 rounded-lg shadow-lg p-8">
                <h1 className='text-center font-bold text-2xl'>Login</h1>
                <input type="text" className='p-2 border border-blue-600 rounded' placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="text" className='p-2 border border-blue-600 rounded' placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <button className='p-2 rounded bg-blue-400 text-white' type="submit">Log in</button>
            </form>
        </div>
    )
}