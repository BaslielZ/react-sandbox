import { useState } from 'react'
import { useMovieStore } from '../store/useMovieStore'


export function MovieList(){
    const [filterType, setFilterType] = useState<'all' | 'watched' | 'unwatched'>('all')
    const movies = useMovieStore(state => state.movies)
    const toggleWatched = useMovieStore(state => state.toggleWatched)

    const filteredMovies = filterType === 'all'
        ? movies 
        : movies.filter(movie => filterType === 'watched' ? movie.watched : !movie.watched)
    
    return (
        <div className='p-6 text'>
            <h1 className='text-xl'>Movie Library</h1>
            <div className='flex gap-2'>
                <button onClick={() => setFilterType('all')} className='p-4 text-white bg-teal-400 text-xl rounded-xl'>All movies</button>
                <button onClick={() => setFilterType('watched')} className='p-4 text-white bg-green-500 text-xl rounded-xl'>Watched</button>
                <button onClick={() => setFilterType('unwatched')} className='p-4 text-white bg-red-600 text-xl rounded-xl'>Not watched</button>
            </div>

            <ul>
                {filteredMovies.map(movie => (
                    <li key={movie.id} className='p-4 my-2 bg-gray-200'>{movie.title} {movie.watched ? '✅ Watched' : '❌ Not watched'} <button className='ml-3 bg-blue-500 text-white p-2 rounded-xl' onClick={() => toggleWatched(movie.id)}>ChangeState</button></li>
                ))}
                {filteredMovies.length === 0 && <li className='font-bold text-xl my-2'>No movies found :(</li>}
            </ul>
        </div>
    )
}