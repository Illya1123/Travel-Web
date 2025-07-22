import axios from 'axios'
import { baseUrl } from './index'

export const requestMoMoPayment = async (orderData) => {
    try {
        const response = await axios.post(`${baseUrl}/api/payment-momo/momo`, orderData, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        return response.data
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu thanh toán MoMo:', error.response?.data || error.message)
        throw error
    }
}

export const checkMomoStatus = async (orderId) => {
    const response = await axios.post(`${baseUrl}/api/payment-momo/momo/status`, { orderId })
    return response.data
}
