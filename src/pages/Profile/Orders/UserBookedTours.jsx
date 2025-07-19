import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserBookedTours = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookedTours = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('userData'))
                if (!userData?._id) {
                    console.error('Không tìm thấy userId trong localStorage')
                    setLoading(false)
                    return
                }

                const response = await axios.get(
                    `http://localhost:3000/api/tour-order/user/${userData._id}`
                )
                setOrders(response.data.orders || [])
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu tour đã đặt:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookedTours()
    }, [])

    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Tour đã đặt</h2>

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : orders.length === 0 ? (
                <p>Bạn chưa đặt tour nào.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) =>
                        order.tour.map((tourItem) => {
                            const tour = tourItem.tourId
                            return (
                                <div
                                    key={order._id + tour._id}
                                    className="flex items-center overflow-hidden rounded-lg border shadow"
                                >
                                    <img
                                        src={tour.image}
                                        alt={tour.title}
                                        className="h-24 w-32 object-cover"
                                    />
                                    <div className="w-full p-4">
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            {tour.title}
                                        </h4>
                                        <p className="mb-1 text-sm text-gray-600">
                                            Mã đơn: {order._id}
                                        </p>
                                        <p className="mb-1 text-sm text-gray-600">
                                            Trạng thái: {order.status}
                                        </p>
                                        <p className="text-sm font-bold text-blue-700">
                                            {order.totalPrice.toLocaleString()} đ
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            )}
        </div>
    )
}

export default UserBookedTours
