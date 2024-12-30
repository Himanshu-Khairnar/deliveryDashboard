import { stringify } from "querystring";

const baseURL = 'http://localhost:3000/api/orders'

type Order = {
    _id?: string;
     orderNumber: string;
      customer: {
        name: string; phone: string; address: string;
    };
    area: string;
    items: {
        name: string; quantity: number; price: number;
    }[];
    status: 'pending' | 'assigned' | 'picked' | 'delivered'; 
    scheduledFor: string;
}

export const getData = async ()=>{
    try {
    const res  = await fetch(`${baseURL}`,{method:'GET'}) 
    console.log(res)
    return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const putData = async (payload: Order) => {
    try {
        const res = await fetch(`${baseURL}/assign`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // Check for successful response
        if (!res.ok) {
            throw new Error('Failed to create order');
        }

        // Parse JSON response
        const data = await res.json();
        return data
    } catch (error) {
        console.log('Error:', error);
    }
}

export const updateData = async (payload:Order,id:string) =>{
    try {
        const res= await fetch(`${baseURL}/${id}/status`,{
            method:'PATCH',
            body: JSON.stringify(payload)
        })
        return  res.json()
    } catch (error) {
        console.log(error)
    }
}