import React, { useState } from 'react';
interface CardProps{
    name: string
    role: string
}

export function TeamCard({name, role}: CardProps){
    const [vote, setVote] = useState(0)

    return (
        <div className='bg-blue-100 hover:bg-blue-200 transition rounded-2xl shadow-lg p-12 w-70 text-center'>
            <p className='font-bold text-2xl'>{name}</p>
            <p className='uppercase text-blue-500'>{role}</p>

            <button className='bg-blue-600 hover:bg-blue-700 transition mt-8 w-full p-2 rounded-sm text-white font-bold' onClick={() => setVote((prev) => prev+1)}>Vote ({vote})</button>
        </div>
    )
}