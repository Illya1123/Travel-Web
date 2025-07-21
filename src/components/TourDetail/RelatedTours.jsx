import React from 'react'
import { useNavigate } from 'react-router-dom'

const RelatedTours = ({ relatedTours }) => {
    const navigate = useNavigate()

    return (
        <div className="rounded-lg bg-white p-4 shadow-md">
            <h3 className="mb-4 text-xl font-semibold text-orange-600">🧭 Các tour liên quan</h3>
            <div className="grid grid-cols-2 gap-4">
                {relatedTours.map((t) => (
                    <div
                        key={t._id}
                        className="cursor-pointer overflow-hidden rounded-md border border-gray-200 bg-gray-50 transition hover:shadow-md"
                        onClick={() => navigate(`/detail/${t._id}`)}
                    >
                        <img src={t.image[0]} alt={t.title} className="h-36 w-full object-cover" />
                        <div className="p-3">
                            <h4 className="line-clamp-2 text-sm font-semibold text-gray-800">
                                {t.title}
                            </h4>
                            <p className="mt-1 text-sm font-bold text-red-600">
                                Giá: {t.price.toLocaleString()} ₫
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RelatedTours
