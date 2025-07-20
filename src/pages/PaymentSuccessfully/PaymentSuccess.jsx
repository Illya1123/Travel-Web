import React from 'react'
import { Link } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa'

const PaymentSuccess = () => {
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
