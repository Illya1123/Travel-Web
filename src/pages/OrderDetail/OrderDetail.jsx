import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getOrderByOrderId } from '../../api/tour_order'
import { FaUser, FaChild, FaMoneyBill, FaCalendarAlt } from 'react-icons/fa'
import { MdConfirmationNumber } from 'react-icons/md'

const OrderDetail = () => {
    const { orderId } = useParams()
    const [order, setOrder] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOrderByOrderId(orderId)
                setOrder(data)
            } catch (err) {
                console.error('Lỗi khi lấy đơn hàng:', err)
            } finally {
                setLoading(false)
            }
        }

        if (orderId) fetchData()
    }, [orderId])

    if (loading) return <p className="mt-8 text-center text-gray-600">Đang tải...</p>
    if (!order) return <p className="mt-8 text-center text-red-500">Không tìm thấy đơn hàng</p>

    const tourItem = order.tour[0]
    const tour = tourItem.tourId

    return (
        <div className="mx-auto min-h-[calc(100vh-100px)] max-w-4xl px-6 py-10">
            <h2 className="mb-6 text-3xl font-bold text-blue-800">Thông tin đơn hàng</h2>

            <div className="rounded-xl border bg-white p-6 shadow">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <img
                            src={tour.image}
                            alt={tour.title}
                            className="h-64 w-full rounded-lg object-cover shadow-sm"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h3 className="mb-2 text-xl font-semibold text-gray-800">
                                {tour.title}
                            </h3>
                            <p className="mb-1 text-sm text-gray-600">
                                🌍 Quốc gia: {tour.country}
                            </p>
                            <p className="mb-1 text-sm text-gray-600">
                                <FaCalendarAlt className="mr-1 inline" />
                                Ngày đi: <b>{new Date(tourItem.date).toLocaleDateString()}</b>
                            </p>
                            <p className="mb-1 text-sm text-gray-600">
                                🛏 Dịch vụ: {tour.services?.join(', ')}
                            </p>
                        </div>

                        <div className="mt-4 space-y-1 border-t pt-4 text-sm text-gray-700">
                            <p>
                                <MdConfirmationNumber className="mr-1 inline" />
                                Mã đơn: <b>{order.orderId}</b>
                            </p>
                            <p>
                                ⏱ Trạng thái:{' '}
                                <span
                                    className={`font-semibold ${
                                        order.status === 'Đã thanh toán'
                                            ? 'text-green-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {order.status}
                                </span>
                            </p>
                            <p>
                                <FaMoneyBill className="mr-1 inline" />
                                Thanh toán: {order.paymentMethod}
                            </p>
                            <p>
                                <FaUser className="mr-1 inline" />
                                Người lớn: {tourItem.numberOfAdults}
                            </p>
                            <p>
                                <FaChild className="mr-1 inline" />
                                Trẻ em: {tourItem.numberOfChildren}
                            </p>
                            {order.voucherCode && (
                                <p>
                                    🎟 Mã giảm giá: <b>{order.voucherCode}</b>
                                </p>
                            )}
                            <p>🗒 Ghi chú: {order.note || 'Không có'}</p>
                            <p>
                                📞 SĐT đón trả: <b>{order.pickupPhone}</b>
                            </p>
                            <p>
                                📍 Địa chỉ đón trả: <b>{order.pickupAddress}</b>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-1 border-t pt-4 text-right text-sm text-gray-800">
                    <p>
                        Giá gốc:{' '}
                        <span className="text-gray-500 line-through">
                            {order.originalPrice.toLocaleString()} đ
                        </span>
                    </p>
                    <p>
                        Giảm giá:{' '}
                        <span className="text-red-600">
                            -{order.discountAmount.toLocaleString()} đ
                        </span>
                    </p>
                    <p className="text-lg font-bold text-blue-700">
                        Tổng cộng: {order.totalPrice.toLocaleString()} đ
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                        Đặt lúc: {new Date(order.createdAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail
