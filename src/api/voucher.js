import axios from 'axios'
import { baseUrl } from './index'

export const checkVoucher = async (code, orderTotal) => {
    try {
        const res = await axios.post(`${baseUrl}/api/vouchers/apply`, {
            code,
            totalPrice: orderTotal,
        })
        return res.data
    } catch (error) {
        throw error.response?.data || { message: 'Lỗi áp dụng mã giảm giá!' }
    }
}
