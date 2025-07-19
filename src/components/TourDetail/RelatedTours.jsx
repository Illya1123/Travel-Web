import React from 'react'
import { useNavigate } from 'react-router-dom'

const RelatedTours = ({ relatedTours }) => {
    const navigate = useNavigate()
    return (
        <div>
            <h3 className="mb-2 text-lg font-semibold text-orange-600">🧭 Các tour liên quan</h3>
            <div className="grid grid-cols-2 gap-4">
                {relatedTours.map((t) => (
                    <div
                        key={t._id}
                        className="cursor-pointer overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
                        onClick={() => navigate(`/detail/${t._id}`)}
                    >
                        <img src={t.image} alt={t.title} className="h-36 w-full object-cover" />
                        <div className="p-3">
                            <h4 className="font-semibold text-gray-800">{t.title}</h4>
                            <p className="text-sm font-bold text-red-600">
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
