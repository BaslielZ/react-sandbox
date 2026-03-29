import {create} from 'zustand'


interface Movie{
    id: number
    title: string
    watched: boolean
}

interface MovieStoreState{
    movies: Movie[]
    toggleWatched: (id: number) => void
}


export const useMovieStore = create<MovieStoreState>((set) => ({
    movies: [
        {id:1, title: 'Cars', watched: true},
        {id:2, title: 'The Emoji Movie', watched: false},
        {id:3, title: 'Horton Hears a Who', watched: true},
        {id:4, title: 'How to Train Your Dragon', watched: false}
    ],
    toggleWatched: (id) => set((state) => {
        const updatedMovies: Movie[] = state.movies.map((movie: Movie) => {
            if(movie.id === id){
                return {...movie, watched: !movie.watched}
            }
            else {
                return movie
            }
        })
        return {movies: updatedMovies}
    })
}))