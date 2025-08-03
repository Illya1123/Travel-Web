import React from 'react'
import { MapPin, Users, Cog, Fuel, Star } from 'lucide-react'
import { formatVND } from '../../../utils/formatCurrency'

const CarCard = ({ car }) => {
    return (
        <div className="reveal-y rounded-xl bg-white p-4 shadow-md transition duration-300 hover:-translate-y-3 hover:shadow-lg">
            <div className="relative overflow-hidden">
                <img
                    src={car.image}
                    alt={car.name}
                    className="h-48 w-full rounded-md object-cover sm:h-56 md:h-60"
                />
                <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-1 text-xs font-semibold shadow">
                    {car.type}
                </span>
                <span className="absolute right-2 top-2 rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                    {car.status}
                </span>
            </div>
            <div className="mt-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{car.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-yellow-500">
                        <Star className="h-5 w-5" /> {car.rating}
                    </div>
                </div>
                <p className="text-sm text-gray-500">Năm {car.year}</p>
                <span className={`font-medium ${car.owner ? 'text-blue-600' : 'text-gray-600'}`}>
                    Chủ xe: {car.owner?.name || 'Travel Car'}
                </span>

                <div className="my-4 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    <span>{car.location}</span>
                </div>
                <div className="mt-2 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-10">
                    <span className="inline-flex items-center gap-1">
                        <Users className="h-4 w-4 text-blue-500" /> {car.seats} chỗ
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Cog className="h-4 w-4 text-blue-500" /> {car.transmission}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Fuel className="h-4 w-4 text-blue-500" /> {car.fuel}
                    </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                    {car.badges.map((badge, i) => (
                        <span
                            key={i}
                            className="rounded-full border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-semibold"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
                <div className="mt-4">
                    <p className="text-lg font-bold text-blue-500">
                        {formatVND(car.price)}
                        <span className="text-sm font-normal text-gray-500">/ngày</span>
                    </p>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                    <button className="w-full cursor-pointer rounded border border-gray-300 px-3 py-2 transition duration-300 hover:bg-gray-300 sm:w-1/2">
                        Xem chi tiết
                    </button>
                    <button className="w-full cursor-pointer rounded bg-green-600 px-3 py-2 text-white transition duration-300 hover:bg-green-700 sm:w-1/2">
                        Đặt ngay
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CarCard
