import {StorePage} from './pages/StorePage'
import { Routes, Route, Link } from 'react-router-dom'
import { AdminLogin} from './pages/AdminLogin'
import { AdminDashboard} from './pages/AdminDashboard'

function App() {
  return (
    <div>
      <header className='h-20 bg-zinc-700 text-white flex gap-4 justify-center items-center text-2xl'>
        <Link to='/'>Store</Link>
        <Link to='/admin'>Admin Dashboard</Link>
      </header>
      <Routes>
        <Route path='/' element={<StorePage />} />
        <Route path='/login' element={<AdminLogin />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </div>
  )
}

export default App
