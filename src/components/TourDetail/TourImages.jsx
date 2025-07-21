import React, { useState } from 'react'

const TourImages = ({ tour }) => {
    const images = Array.isArray(tour.image) ? tour.image : [tour.image].filter(Boolean)
    const [mainImage, setMainImage] = useState(images[0] || '')

    if (!images.length) {
        return <div className="text-center text-gray-500">Không có hình ảnh</div>
    }

    return (
        <div className="space-y-4">
            {/* Ảnh chính */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden border shadow">
                <img
                    src={mainImage}
                    alt="Ảnh chính"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Thumbnail ảnh phụ */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Ảnh ${index + 1}`}
                        onClick={() => setMainImage(img)}
                        className={`w-24 h-16 object-cover rounded-lg border-2 cursor-pointer transition ${
                            img === mainImage
                                ? 'border-blue-500 shadow-md'
                                : 'border-gray-300 hover:border-blue-400'
                        }`}
                    />
                ))}
            </div>
        </div>
    )
}

export default TourImages
