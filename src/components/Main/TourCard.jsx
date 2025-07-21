import React from 'react'
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi'

const TourCard = ({ tour, onClick }) => {
    return (
        <div className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg">
            <div className="h-48 w-full overflow-hidden">
                <img
                    src={tour.image[0] || '/default-image.jpg'}
                    alt={tour.title}
                    className="h-full w-full object-cover"
                />
            </div>

            <div className="flex flex-1 flex-col justify-between p-4">
                <h4 className="mb-1 text-lg font-semibold text-gray-800">{tour.title}</h4>

                <div className="mb-2 flex items-center text-sm text-gray-600">
                    <HiOutlineLocationMarker className="mr-1 text-sky-600" />
                    <span>{tour.country}</span>
                </div>

                <div className="mb-2 flex items-center justify-between text-sm text-gray-700">
                    <div>
                        <span className="font-semibold">{tour.type}</span>{' '}
                        <small>
                            {tour.score}⭐ - {tour.score_description}
                        </small>
                    </div>
                    <div className="text-base font-bold text-sky-700">
                        {tour.price ? `${tour.price.toLocaleString()} vnđ` : 'Đang cập nhật'}
                    </div>
                </div>

                <button
                    className="mt-3 flex items-center justify-center gap-2 rounded bg-sky-700 px-4 py-2 text-white transition hover:bg-sky-800"
                    onClick={onClick}
                >
                    <span>Chi tiết</span>
                    <HiOutlineClipboardCheck />
                </button>
            </div>
        </div>
    )
}

export default TourCard
