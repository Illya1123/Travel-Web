import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRef } from 'react'
import { FaUser, FaChild, FaMoneyBill, FaStickyNote, FaCalendarAlt } from 'react-icons/fa'
import { MdConfirmationNumber } from 'react-icons/md'
import { QRCodeCanvas } from 'qrcode.react'
import { getOrdersByUserId } from '../../../api/tour_order'

const UserBookedTours = () => {
    const qrRefs = useRef({})
    const [orders, setOrders] = useState([])
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBookedTours = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('userData'))
                if (!userData?.id) {
                    console.error('Không tìm thấy userId trong localStorage')
                    setLoading(false)
                    return
                }

                const data = await getOrdersByUserId(userData.id)
                setOrders(data.orders || [])
                setUser(data.user || null)
            } catch (err) {
                console.error('Lỗi khi lấy dữ liệu tour đã đặt:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchBookedTours()
    }, [])

    const handleDownloadQR = (orderId) => {
        const canvas = qrRefs.current[orderId]
        if (canvas) {
            const url = canvas.toDataURL('image/png')
            const link = document.createElement('a')
            link.href = url
            link.download = `QRCode_${orderId}.png`
            link.click()
        }
    }
    return (
        <div className="mx-auto max-w-5xl px-4 py-8">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">Tour đã đặt</h2>

            {user && (
                <div className="mb-6 rounded-lg bg-blue-50 p-4 shadow-sm">
                    <p className="text-gray-700">
                        👤 <b>{user.name}</b> | 📧 {user.email}
                    </p>
                </div>
            )}

            {loading ? (
                <p>Đang tải dữ liệu...</p>
            ) : orders.length === 0 ? (
                <p>Bạn chưa đặt tour nào.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) =>
                        order.tour.map((tourItem) => {
                            const tour = tourItem.tourId

                            const qrData = {
                                orderId: order.orderId,
                                status: order.status,
                                paymentMethod: order.paymentMethod,
                                totalPrice: order.totalPrice,
                                date: tourItem.date,
                                numberOfAdults: tourItem.numberOfAdults,
                                numberOfChildren: tourItem.numberOfChildren,
                                voucherCode: order.voucherCode,
                                tourTitle: tour.title,
                                tourCountry: tour.country,
                                tourDate: tour.date,
                                services: tour.services,
                                overview: tour.overview,
                            }

                            return (
                                <div
                                    key={order._id + tour._id}
                                    className="overflow-hidden rounded-xl border bg-white shadow-md"
                                >
                                    <div className="flex flex-col sm:flex-row">
                                        <img
                                            src={tour.image}
                                            alt={tour.title}
                                            className="h-48 w-full object-cover sm:h-auto sm:w-64"
                                        />
                                        <div className="flex-1 p-4">
                                            <h3 className="text-xl font-semibold text-gray-800">
                                                {tour.title}
                                            </h3>
                                            <p className="mb-1 text-sm text-gray-600">
                                                📍 Quốc gia: <b>{tour.country}</b>
                                            </p>
                                            <p className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                                                <FaCalendarAlt /> Ngày khởi hành:{' '}
                                                <b>{new Date(tour.date).toLocaleDateString()}</b>
                                            </p>
                                            <p className="mb-1 text-sm text-gray-600">
                                                🛏 Dịch vụ: {tour.services?.join(', ')}
                                            </p>
                                            <p className="mb-1 flex items-center gap-1 text-sm text-gray-600">
                                                <MdConfirmationNumber /> Mã đơn:{' '}
                                                <b>{order.orderId}</b>
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                ⏱ Trạng thái:{' '}
                                                <span
                                                    className={`font-semibold ${
                                                        order.status === 'Đã thanh toán'
                                                            ? 'text-green-600'
                                                            : 'text-red-500'
                                                    }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </p>
                                            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-700">
                                                <span className="flex items-center gap-1">
                                                    <FaUser /> Người lớn:{' '}
                                                    <b>{tourItem.numberOfAdults}</b>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaChild /> Trẻ em:{' '}
                                                    <b>{tourItem.numberOfChildren}</b>
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <FaMoneyBill /> Thanh toán:{' '}
                                                    <b>{order.paymentMethod}</b>
                                                </span>
                                                {order.voucherCode && (
                                                    <span className="flex items-center gap-1">
                                                        🎟 Mã giảm giá: <b>{order.voucherCode}</b>
                                                    </span>
                                                )}
                                            </div>
                                            <p className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                                                <FaStickyNote /> Ghi chú: {order.note || 'Không có'}
                                            </p>
                                            <p className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                                                📞 SĐT đón trả:{' '}
                                                <b>{order.pickupPhone || 'Không có'}</b>
                                            </p>
                                            <p className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                                                📍 Địa chỉ đón trả:{' '}
                                                <b>{order.pickupAddress || 'Không có'}</b>
                                            </p>

                                            <div className="mt-4 text-right text-sm">
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
                                                    Thành tiền: {order.totalPrice.toLocaleString()}{' '}
                                                    đ
                                                </p>
                                            </div>

                                            {/* QR CODE */}
                                            <div className="mt-6 text-center">
                                                <p className="mb-2 text-sm font-medium text-gray-700">
                                                    📲 Quét mã QR để xem thông tin chi tiết
                                                </p>

                                                <div className="mt-6 flex flex-col items-center">
                                                    <button
                                                        onClick={() =>
                                                            handleDownloadQR(order.orderId)
                                                        }
                                                        className="mb-2 rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-blue-700"
                                                    >
                                                        Tải mã QR
                                                    </button>

                                                    <div className="rounded-lg border bg-white p-2 shadow">
                                                        <QRCodeCanvas
                                                            value={`https://travel-web-seven-xi.vercel.app/order/${order.orderId}`}
                                                            size={128}
                                                            fgColor="#1e3a8a"
                                                            includeMargin={true}
                                                            ref={(el) =>
                                                                (qrRefs.current[order.orderId] = el)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
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
