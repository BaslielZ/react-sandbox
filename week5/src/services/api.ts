export async function login(username: string, password: string) {
    const response = await fetch('https://dummyjson.com/auth/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         // The data we are sending must be converted to a JSON string!
         body: JSON.stringify({ 
           username: username, 
           password: password 
         })
       });
    if (!response.ok) throw new Error("Wrong credentials!")
    const data = await response.json()
    return data.accessToken
}


export const sendFeedack = async (title: string, message: string) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({
                    title: title,
                    message: message,
                    userId: 1
                })
            })
    if (!response.ok) throw new Error('Failed to submit feedback.')
    const data = await response.json()
    return data
}