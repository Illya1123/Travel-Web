import React, { useState } from 'react'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FcRating } from 'react-icons/fc'

const TourInfo = ({ tour }) => {
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
        <div className="flex flex-col gap-4">
            <div>
                <span className="text-black-600 text-xl font-bold">Loại tour: </span>
                <span className="font-semibold text-orange-600">{tour.type}</span>
                <h1 className="text-3xl font-bold">{tour.title}</h1>
            </div>

            <div className="flex flex-col gap-4 rounded-lg bg-yellow-50 p-4 shadow">
                <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
                    <div className="text-xl font-bold text-red-600">
                        Tổng: {totalPrice.toLocaleString()} VNĐ
                        <p className="mt-1 text-sm font-medium text-gray-600">
                            Giảm 20% cho khách trẻ em (dưới 6 tuổi)
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label>
                            Người lớn:
                            <input
                                type="number"
                                value={adults}
                                min={1}
                                className="ml-2 w-16 rounded border px-2 py-1"
                                onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                            />
                        </label>
                        <label>
                            Trẻ em:
                            <input
                                type="number"
                                value={children}
                                min={0}
                                className="ml-2 w-16 rounded border px-2 py-1"
                                onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                            />
                        </label>
                    </div>
                    <button className="animate-pulse rounded-xl bg-orange-500 px-10 py-3 font-semibold text-white transition hover:bg-orange-600">
                        ĐẶT NGAY
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-gray-800 shadow-sm md:grid-cols-2">
                <div className="flex items-center gap-2">
                    <HiOutlineLocationMarker className="text-xl text-orange-500" />
                    <span className="font-medium">{tour.country}</span>
                </div>
                <div className="flex items-center gap-2">
                    <FcRating className="text-xl" />
                    <span className="font-medium">{tour.score} - {tour.score_description}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xl">📅</span>
                    <span className="font-medium">{tour.date}</span>
                </div>
            </div>

            <h3 className="mt-4 text-xl font-semibold text-orange-500">📝 Tổng quan</h3>
            <ul className="list-disc space-y-2 pl-5 text-xl text-gray-700">
                {tour.overview?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-orange-500">✅ Dịch vụ bao gồm</h3>
            <table className="w-full table-auto border-collapse border border-gray-300 text-gray-700">
                <tbody>
                    {serviceRows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b border-gray-200">
                            {row.map((service, colIndex) => (
                                <td key={colIndex} className="w-1/3 px-4 py-2">{service}</td>
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
    )
}

export default TourInfo
