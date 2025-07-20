import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getTour } from '../../api/tours'
import { requestMoMoPayment } from '../../api/momo'
import { checkVoucher } from '../../api/voucher'
import UserInfoForm from '../../components/OneStepCheckout/UserInfoForm/UserInfoForm'
import TourInfo from '../../components/OneStepCheckout/TourInfo'
import DiscountSection from '../../components/OneStepCheckout/DiscountSection'
import PaymentMethod from '../../components/OneStepCheckout/PaymentMethod'
import ConfirmModal from '../../components/OneStepCheckout/ConfirmModal'
import NoteSection from '../../components/OneStepCheckout/NoteSection'

const OneStepCheckout = () => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const tourId = searchParams.get('tourId')
    const adultsQuery = parseInt(searchParams.get('adults')) || 1
    const childrenQuery = parseInt(searchParams.get('children')) || 0
    const priceQuery = parseInt(searchParams.get('price')) || 0

    const todayPlus7 = new Date()
    todayPlus7.setDate(todayPlus7.getDate() + 7)
    const minDate = todayPlus7.toISOString().split('T')[0]

    const [tour, setTour] = useState(null)
    const [user, setUser] = useState({})
    const [phoneError, setPhoneError] = useState('')
    const [discountCode, setDiscountCode] = useState('')
    const [selectedDate, setSelectedDate] = useState(minDate)
    const [note, setNote] = useState('')
    const [showConfirm, setShowConfirm] = useState(false)
    const [selectedMethod, setSelectedMethod] = useState('MoMo')
    const [discountAmount, setDiscountAmount] = useState(0)
    const [voucherId, setVoucherId] = useState(null)

    const [adults, setAdults] = useState(adultsQuery)
    const [children, setChildren] = useState(childrenQuery)
    const [finalPrice, setFinalPrice] = useState(priceQuery)

    const validatePhoneVN = (phone) => {
        const vnPhoneRegex = /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-5]|9[0-9])[0-9]{7}$/
        return vnPhoneRegex.test(phone)
    }

    const isFormValid = () => {
        return validatePhoneVN(user.phone?.trim() || '') && user.address?.trim()?.length > 0
    }

    const handleConfirmClick = () => {
        if (!isFormValid()) {
            alert(
                'Vui lòng điền đầy đủ số điện thoại và địa chỉ hợp lệ trước khi xác nhận đặt tour.'
            )
            return
        }
        setShowConfirm(true)
    }

    const handlePayment = async () => {
        if (!user) {
            alert('Bạn cần đăng nhập để đặt tour!')
            return
        }

        const originalPrice = Math.round(tour.price * adults + tour.price * 0.8 * children)

        const orderData = {
            userId: user.uid || user._id,
            status: 'Đã đặt',
            tour: [
                {
                    tourId: tour._id,
                    numberOfAdults: adults,
                    numberOfChildren: children,
                    date: selectedDate,
                },
            ],
            paymentMethod: selectedMethod === 'Tiền Mặt' ? 'Tiền Mặt' : 'Chuyển khoản',
            note,
            originalPrice,
            discountAmount,
            totalPrice: originalPrice - discountAmount,
            voucherId,
        }

        try {
            const result = await requestMoMoPayment(orderData)
            console.log('Kết quả thanh toán:', result)

            if (result.resultCode === 0 && result.payUrl) {
                window.location.href = result.payUrl // 🔁 redirect người dùng tới trang MoMo
            } else {
                alert(result.message || 'Thanh toán thất bại!')
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error)
            alert('Không thể kết nối với máy chủ!')
        }

        setShowConfirm(false)
    }

    useEffect(() => {
        if (tourId) {
            getTour(tourId).then((res) => {
                if (res.status === 'success') {
                    setTour(res.data)
                }
            })
        }
        const userStored = JSON.parse(localStorage.getItem('userData'))
        if (userStored) {
            setUser(userStored)
        }
    }, [tourId])

    useEffect(() => {
        if (tour?.price) {
            const total = Math.round(tour.price * adults + tour.price * 0.8 * children)
            setFinalPrice(total)
        }
    }, [adults, children, tour])

    const applyDiscount = async () => {
        if (!discountCode) {
            alert('Vui lòng nhập mã khuyến mãi!')
            return
        }

        const original = Math.round(tour.price * adults + tour.price * 0.8 * children)

        try {
            const res = await checkVoucher(discountCode, original)

            if (res.voucherId && res.discountAmount != null) {
                setDiscountAmount(res.discountAmount)
                setVoucherId(res.voucherId)
                setFinalPrice(original - res.discountAmount)
                alert('Áp dụng mã giảm giá thành công!')
            } else {
                throw new Error('Mã không hợp lệ!')
            }
        } catch (err) {
            alert(err.message || 'Mã giảm giá không hợp lệ!')
            setDiscountAmount(0)
            setVoucherId(null)
            setFinalPrice(original)
        }
    }

    if (!tour) return <p className="mt-10 text-center">Đang tải thông tin tour...</p>

    return (
        <div className="mx-auto max-w-6xl p-4">
            <div className="rounded-2xl border bg-white p-6 shadow-lg">
                <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">
                    Xác nhận đặt tour
                </h1>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <UserInfoForm
                        user={user}
                        setUser={setUser}
                        phoneError={phoneError}
                        setPhoneError={setPhoneError}
                        validatePhoneVN={validatePhoneVN}
                    />
                    <TourInfo
                        tour={tour}
                        adults={adults}
                        children={children}
                        setAdults={setAdults}
                        setChildren={setChildren}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        minDate={minDate}
                    />
                </div>

                <DiscountSection
                    discountCode={discountCode}
                    setDiscountCode={setDiscountCode}
                    applyDiscount={applyDiscount}
                />

                <PaymentMethod
                    selectedMethod={selectedMethod}
                    setSelectedMethod={setSelectedMethod}
                />

                <NoteSection note={note} setNote={setNote} />

                <div className="mt-10 flex flex-col items-center justify-between sm:flex-row">
                    <div className="text-2xl font-bold text-gray-800">
                        Tổng tiền: {(finalPrice || 0)?.toLocaleString()}đ
                        {discountAmount > 0 && (
                            <span className="ml-2 text-sm text-green-600">
                                (Đã giảm {discountAmount.toLocaleString()}đ)
                            </span>
                        )}
                    </div>

                    <button
                        onClick={handleConfirmClick}
                        disabled={!isFormValid()}
                        className={`mt-4 rounded-xl px-8 py-3 font-semibold text-white transition sm:mt-0 ${
                            isFormValid()
                                ? 'bg-green-600 hover:bg-green-700'
                                : 'cursor-not-allowed bg-gray-400'
                        }`}
                    >
                        XÁC NHẬN ĐẶT TOUR
                    </button>
                </div>

                {showConfirm && (
                    <ConfirmModal handlePayment={handlePayment} setShowConfirm={setShowConfirm} />
                )}
            </div>
        </div>
    )
}

export default OneStepCheckout
