import React, { useState } from 'react'

const TourImages = ({ tour }) => {
    const images = Array.isArray(tour.image) ? tour.image : [tour.image].filter(Boolean)
    const [selectedImage, setSelectedImage] = useState(images[0] || '')

    if (!images.length) {
        return <div className="text-gray-500 text-center">Không có hình ảnh</div>
    }

    return (
        <div className="space-y-4">
            {/* Ảnh chính */}
            <div className="w-full h-[400px] rounded-xl overflow-hidden border shadow">
                <img
                    src={selectedImage}
                    alt="Ảnh chính"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Ảnh nhỏ (thumbnail) */}
            <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {images.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Ảnh ${index + 1}`}
                        className={`w-24 h-16 object-cover rounded-lg border-2 cursor-pointer transition ${
                            img === selectedImage
                                ? 'border-blue-500 shadow-md'
                                : 'border-gray-300 hover:border-blue-400'
                        }`}
                        onClick={() => setSelectedImage(img)}
                    />
                ))}
            </div>
        </div>
    )
}

export default TourImages
