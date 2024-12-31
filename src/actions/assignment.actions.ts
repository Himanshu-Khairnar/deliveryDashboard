import { AwardIcon } from "lucide-react"

const baseURL = 'http://localhost:3000/api/assignment'

type AssignmentMetrics = {
    orderId: string; partnerId:
    string; timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
}
type Assignment = {
    orderId: string; partnerId:
    string; timestamp: Date;
    status: 'success' | 'failed';
    reason?: string;
}

export const getAssignmentMetric = async () => {
    try {
        const res = await fetch(`${baseURL}/metric`, { method: 'GET' })
        return res.json()

    } catch (error) {
        console.log(error)
    }
}



export const postAssignmentMertric = async (payload: AssignmentMetrics) => {
    try {
        const res = await fetch(`${baseURL}/mertric`,
            {
                method: "POST",
                body: JSON.stringify(payload)
            })
            return res.json()
    } catch (error) {
        console.log(error)
    }
}

export const getassignment=async()=>{
    try {
        const res = await fetch(`${baseURL}/run`,{method:'GET'})
        return res.json()

    } catch (error) {
        console.log(error)
    }
}

export const postassignment = async(formData:  Assignment)=>{
    try {
        const res = await fetch(`${baseURL}/run`,{method:"POST",body:JSON.stringify(formData)})
        return res.json()
    } catch (error) {
        console.log(error)
    }
}