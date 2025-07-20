import axios from 'axios'
import { baseUrl } from './index'

export const getOrderByOrderId = async (orderId) => {
    const res = await axios.get(`${baseUrl}/api/tour-order/order/${orderId}`)
    return res.data.order
}

export const getOrdersByUserId = async (userId) => {
    const response = await axios.get(`${baseUrl}/api/tour-order/user/${userId}`)
    return response.data
}
