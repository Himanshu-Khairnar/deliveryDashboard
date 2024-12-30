import { get, METHODS } from "http"
import { Model } from "mongoose";
export type DeliveryPartner = {
    name: string;
    email: string;
    phone: string;
    status: "active" | "inactive";
    currentLoad: number; // max: 3
    areas: string[];
    shift: { start: string; end: string };
};
const baseURL = 'http://localhost:3000/api'

export const getpartner = async () => {
    try {
        const res = await fetch(`${baseURL}/partners`,{
            method:'GET'
        })
        console.log(res)
        return res.json()
    } catch (error) {
        console.log(error)
    }
}
export const getSpecficpartner = async (id:string) => {

    try {
        const res = await fetch(`${baseURL}/partners/${id}`,{
            method:'GET'
        })
        console.log(res)
        return res.json()
    } catch (error) {
        console.log(error)
    }
}


export const postPartner = async (formData :DeliveryPartner) => {

    try {
        const response = await fetch(`${baseURL}/partners`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            return result
        } else {
            const errorData = await response.json();
            console.log(errorData)
            return errorData
        }
    } catch (error) {
        console.error("Error submitting form:", error);
    }
};

export const deletePartner = async (id: string) => {
    try {
        const response = await fetch(`${baseURL}/partners/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete partner');
        }

        const data = await response.json();
        return data; // Return success message or any relevant data
    } catch (error) {
        console.error("Error deleting partner:", error);
        throw error; // Propagate error for handling in the calling function
    }
};

export const updatePartner = async (id: string, formData: DeliveryPartner) => {
    try {
        console.log(id)
        const response = await fetch(`${baseURL}/partners/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Failed to update partner');
        }

        const updatedPartner = await response.json();
        return updatedPartner; // Return the updated partner data
    } catch (error) {
        console.error("Error updating partner:", error);
        throw error; // Propagate error for handling in the calling function
    }
};