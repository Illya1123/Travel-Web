import React from 'react';

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
];

const UserBookedTours = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tour đã đặt</h2>

      {bookedTours.length === 0 ? (
        <p>Bạn chưa đặt tour nào.</p>
      ) : (
        <div className="space-y-6">
          {bookedTours.map((tour) => (
            <div
              key={tour.id}
              className="flex items-center border rounded-lg overflow-hidden shadow"
            >
              <img
                src={tour.image}
                alt={tour.title}
                className="w-32 h-24 object-cover"
              />
              <div className="p-4 w-full">
                <h4 className="text-lg font-semibold text-gray-800">
                  {tour.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">Ngày đi: {tour.date}</p>
                <p className="text-sm text-blue-700 font-bold">
                  {tour.price.toLocaleString()} đ
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookedTours;
