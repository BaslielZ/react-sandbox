import { useState, useEffect } from 'react'

//without type|interface, Typescript assigns 'cats' state with type 'never'
type Cat = {     
    id: string
    url: string
}

export function CatGallery(){
    const [cats, setCats] = useState<Cat[]>([])
    useEffect( () => {
        fetch('https://api.thecatapi.com/v1/images/search?limit=10')
        .then(response => response.json())
        .then(data => setCats(data))
        .catch((error) => console.error(error)); 
    }, [])
    return (
        <div className='p-8 grid grid-cols-1 md:grid-cols-3 gap-6'>
            {cats ? (
                cats.map((cat:Cat)=> (
                    <img key={cat.id} src={cat.url} alt="cat image :)" />
                ))
            ) : (
                <p>Loading cats...</p>
            )}

        </div>
    )
}