import React, { useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FcRating } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'

const TourInfo = ({ tour }) => {
    const navigate = useNavigate()
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const totalPrice = Math.round(tour.price * adults + tour.price * 0.8 * children)

    const columns = 3
    const serviceRows = []
    if (tour.services?.length > 0) {
        for (let i = 0; i < tour.services.length; i += columns) {
            serviceRows.push(tour.services.slice(i, i + columns))
        }
    }

    return (
        <div className="flex flex-col gap-6">
            {/* 1. Phần loại tour và tiêu đề */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">
                <div className="space-y-2">
                    <span className="text-lg font-semibold text-black">Loại tour: </span>
                    <span className="font-semibold text-orange-600">{tour.type}</span>
                    <h1 className="text-3xl font-bold text-gray-800">{tour.title}</h1>
                </div>
            </div>

            {/* 2. Tính toán giá */}
            <div className="rounded-xl border border-gray-200 bg-yellow-50 p-5 shadow">
                <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-3">
                    <div className="text-xl font-bold text-red-600">
                        Tổng: {totalPrice.toLocaleString()} VNĐ
                        <p className="mt-1 text-sm text-gray-600">
                            Giảm 20% cho khách trẻ em (dưới 6 tuổi)
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">
                            Người lớn:
                            <input
                                type="number"
                                value={adults}
                                min={1}
                                className="ml-2 w-16 rounded border border-gray-300 px-2 py-1"
                                onChange={(e) =>
                                    setAdults(Math.max(1, parseInt(e.target.value) || 1))
                                }
                            />
                        </label>
                        <label className="text-sm font-medium text-gray-700">
                            Trẻ em:
                            <input
                                type="number"
                                value={children}
                                min={0}
                                className="ml-2 w-16 rounded border border-gray-300 px-2 py-1"
                                onChange={(e) =>
                                    setChildren(Math.max(0, parseInt(e.target.value) || 0))
                                }
                            />
                        </label>
                    </div>
                    <button
                        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow transition hover:bg-orange-600"
                        onClick={() =>
                            navigate(
                                `/onestepcheckout?tourId=${tour._id}&adults=${adults}&children=${children}&price=${totalPrice}`
                            )
                        }
                    >
                        ĐẶT NGAY
                    </button>
                </div>
            </div>

            {/* 3. Thông tin cơ bản: quốc gia, điểm, ngày */}
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-5 text-gray-800 shadow-sm md:grid-cols-2">
                <div className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-xl text-orange-500" />
                    <span className="font-medium">{tour.country}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FcRating className="text-xl" />
                    <span className="font-medium">
                        {tour.score} - {tour.score_description}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <span className="font-medium">{tour.date} (Ngày cập nhật)</span>
                </div>
            </div>

            {/* 4. Tổng quan */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">
                <h3 className="mb-3 text-xl font-semibold text-orange-500">📝 Tổng quan</h3>
                <ul className="list-disc space-y-2 pl-5 text-base text-gray-700">
                    {tour.overview?.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* 5. Dịch vụ bao gồm */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow">
                <h3 className="mb-3 text-xl font-semibold text-orange-500">✅ Dịch vụ bao gồm</h3>
                <table className="w-full table-auto border-collapse border border-gray-300 text-gray-700">
                    <tbody>
                        {serviceRows.map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-gray-200">
                                {row.map((service, colIndex) => (
                                    <td key={colIndex} className="w-1/3 px-4 py-2">
                                        {service}
                                    </td>
                                ))}
                                {row.length < columns &&
                                    Array.from({ length: columns - row.length }).map((_, idx) => (
                                        <td key={`empty-${idx}`} className="w-1/3 px-4 py-2"></td>
                                    ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TourInfo
