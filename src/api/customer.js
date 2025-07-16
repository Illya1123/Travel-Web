// api/customer.js
import axios from 'axios'
import { baseUrl } from './index'

const getUserById = async (id) => {
    try {
        // Get token from local storage
        const token = localStorage.getItem('token')
        const response = await axios.get(`${baseUrl}/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Fetch failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const getCustomerById = async (id) => {
    try {
        // Get token from local storage
        const token = localStorage.getItem('token')
        const response = await axios.get(`${baseUrl}/customers/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Fetch failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const updateCustomerById = async (id, item) => {
    try {
        // Get token from local storage
        const token = localStorage.getItem('token')
        const response = await axios.post(`${baseUrl}/customers/update/${id}`, item, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Update failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const updateAccountById = async (id, item) => {
    try {
        // Get token from local storage
        const token = localStorage.getItem('token')
        const response = await axios.post(`${baseUrl}/customers/account_update/${id}`, item, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        return response.data
    } catch (error) {
        console.error('Update failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const updatePassword = async (id, oldPassword, newPassword) => {
    try {
        // Get token from local storage
        const token = localStorage.getItem('token')
        const response = await axios.patch(
            `${baseUrl}/users/change-password`,
            { oldPassword, newPassword },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        return response.data
    } catch (error) {
        console.error('Update failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

export { getUserById, getCustomerById, updateCustomerById, updateAccountById, updatePassword }
