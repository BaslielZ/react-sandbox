export async function loginAdmin(username: string, password: string){
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
        if (!response.ok){
            throw new Error('Login failed')
        }
        const data = await response.json()
        return data.accessToken
    } catch (err){
        console.error(err)
    }
}



export async function addProduct(title: string, price: number, token: string){
    try {
        const response = await fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 
                'Authorization' : 'Bearer ' + token,
                'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: title,
                price: price,
            })
        })
        if (!response.ok){
            throw new Error('Product addition failed')
        }
        const data = await response.json()
        return data
    } catch (err){
        console.error(err)
    }
}