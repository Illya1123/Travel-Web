import React from 'react'
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi'

const TourCard = ({ tour, onClick }) => {
    return (
        <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            {/* Image */}
            <div className="h-52 w-full overflow-hidden rounded-t-2xl">
                <img
                    src={tour.image[0] || '/default-image.jpg'}
                    alt={tour.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
                {/* Title */}
                <h4 className="text-lg font-semibold text-gray-800 line-clamp-2">{tour.title}</h4>

                {/* Country */}
                <div className="flex items-center text-sm text-gray-500">
                    <HiOutlineLocationMarker className="mr-1 text-sky-600 text-base" />
                    <span>{tour.country}</span>
                </div>

                {/* Type, Score, Price */}
                <div className="flex justify-between items-center text-sm text-gray-700">
                    <div>
                        <span className="font-medium text-gray-700">{tour.type}</span>
                        <div className="text-xs text-gray-500">
                            {tour.score}⭐ – {tour.score_description}
                        </div>
                    </div>
                    <div className="text-right text-sky-700 font-bold text-base">
                        {tour.price ? `${tour.price.toLocaleString()} ₫` : 'Đang cập nhật'}
                    </div>
                </div>

                {/* Button */}
                <button
                    className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-sm font-medium text-white hover:bg-sky-800 transition"
                    onClick={onClick}
                >
                    <span>Chi tiết</span>
                    <HiOutlineClipboardCheck className="text-lg" />
                </button>
            </div>
        </div>
    )
}

export default TourCard
