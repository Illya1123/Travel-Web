import axios from 'axios'
import { baseUrl } from './index'

export const getAllTours = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/tour/getAllTours`)
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy danh sách tour:', error.response?.data || error.message)
        throw error
    }
}

export const getTour = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/api/tour/getTour/${id}`)
        return response.data
    } catch (error) {
        console.error('Lỗi khi lấy thông tin tour:', error.response?.data || error.message)
        throw error
    }
}
