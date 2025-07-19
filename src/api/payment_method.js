import axios from 'axios'
import { baseUrl } from './index'

// Gọi API để lấy danh sách phương thức thanh toán
export const getPaymentMethods = async () => {
    const response = await axios.get(`${baseUrl}/api/payment-method`)
    return response.data
}
