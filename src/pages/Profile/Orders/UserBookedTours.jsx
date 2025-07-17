import React from 'react'

const bookedTours = [
    {
        id: 't1',
        title: 'Tour Đà Lạt 3 ngày 2 đêm',
        date: '20/08/2025',
        price: 3500000,
        image: 'https://picsum.photos/id/1018/400/200',
    },
    {
        id: 't2',
        title: 'Tour Phú Quốc 4 ngày 3 đêm',
        date: '10/09/2025',
        price: 5200000,
        image: 'https://picsum.photos/id/1023/400/200',
    },
]

const UserBookedTours = () => {
    return (
        <div>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Tour đã đặt</h2>

            {bookedTours.length === 0 ? (
                <p>Bạn chưa đặt tour nào.</p>
            ) : (
                <div className="space-y-6">
                    {bookedTours.map((tour) => (
                        <div
                            key={tour.id}
                            className="flex items-center overflow-hidden rounded-lg border shadow"
                        >
                            <img
                                src={tour.image}
                                alt={tour.title}
                                className="h-24 w-32 object-cover"
                            />
                            <div className="w-full p-4">
                                <h4 className="text-lg font-semibold text-gray-800">
                                    {tour.title}
                                </h4>
                                <p className="mb-1 text-sm text-gray-600">Ngày đi: {tour.date}</p>
                                <p className="text-sm font-bold text-blue-700">
                                    {tour.price.toLocaleString()} đ
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserBookedTours
