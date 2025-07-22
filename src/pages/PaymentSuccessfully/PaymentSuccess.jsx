import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'
import { checkMomoStatus } from '../../api/momo'

const PaymentSuccess = () => {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const orderId = queryParams.get('orderId')
    const [statusChecked, setStatusChecked] = useState(false)

    useEffect(() => {
        const verifyPayment = async () => {
            try {
                if (!orderId) return
                await checkMomoStatus(orderId)
                setStatusChecked(true)
            } catch (error) {
                console.error('❌ Lỗi xác thực thanh toán:', error.message)
            }
        }

        verifyPayment()
    }, [orderId])

    if (!statusChecked) {
        return (
            <div className="flex h-[calc(100vh-100px)] items-center justify-center text-lg text-gray-600">
                Đang xác minh thanh toán...
            </div>
        )
    }

    return (
        <div className="flex min-h-[calc(100vh-100px)] flex-col items-center justify-center bg-green-50 p-6 text-center">
            <FaCheckCircle className="mb-4 text-6xl text-green-500" />
            <h1 className="mb-2 text-3xl font-bold text-green-600">Thanh toán thành công!</h1>
            <p className="mb-6 text-gray-700">
                Cảm ơn bạn đã đặt tour. Chúng tôi sẽ liên hệ với bạn để xác nhận thông tin.
            </p>
            <Link
                to="/"
                className="rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
            >
                Quay về trang chủ
            </Link>
        </div>
    )
}

export default PaymentSuccess
