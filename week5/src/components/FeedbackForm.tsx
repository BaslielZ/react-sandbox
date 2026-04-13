import { useState } from 'react'
import { sendFeedack } from '../services/api'

export function FeedbackForm(){
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [responseId, setResponseId] = useState(null)

    async function submitFeedback(e: React.SyntheticEvent){
        e.preventDefault()
        const feedbackResponse = await sendFeedack(title, message)
        setResponseId(feedbackResponse.id)
        setIsSubmitted(true)
    }
    return (
        <div>

            {isSubmitted ? (
                <div className='p-4 flex flex-col justify-center items-center bg-green-200 rounded-md border-green-400 border'>
                    <p className='font-bold text-lg text-green-700'>Thank you for your feedback!</p>
                    <p className=' text-green-700'>Your message was saved with ID: {responseId}</p>
                </div>
            )  : (
            <div className='p-2'>
                <form action="" onSubmit={submitFeedback} className='flex flex-col gap-4 border p-4 rounded shadow-lg'>
                    <h2 className='text-xl font-bold'>Give Feedback</h2>
                    <input type="text" placeholder="Title" value={title} onChange= {(e) => setTitle(e.target.value)} className='border p-2 rounded-md' />
                    <textarea placeholder="Write your message here..." value={message} onChange= {(e) => setMessage(e.target.value)} className='border p-2 h-30 rounded-md' />
                    <button type="submit" className='bg-blue-500 p-2 text-white rounded-md font-bold'>Submit Feedback</button>
                </form>
            </div>)}
            
        </div>
    )
}