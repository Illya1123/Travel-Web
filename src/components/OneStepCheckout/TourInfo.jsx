import React from 'react'

const TourInfo = ({
    tour,
    adults,
    children,
    setAdults,
    setChildren,
    selectedDate,
    setSelectedDate,
    minDate,
}) => {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold text-gray-700">Thông tin tour</h2>
            <img
                src={tour.image[0]}
                alt={tour.title}
                className="mb-4 h-48 w-full rounded-xl object-cover"
            />
            <p className="text-lg font-bold text-gray-800">{tour.title}</p>
            <p className="mt-2 text-gray-600">
                Giá cơ bản: <span className="font-semibold">{tour.price.toLocaleString()}đ</span>
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <label className="text-sm font-medium text-gray-700">
                    Người lớn:
                    <input
                        type="number"
                        value={adults}
                        min={1}
                        onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                        className="ml-2 w-20 rounded border border-gray-300 px-2 py-1"
                    />
                </label>
                <label className="text-sm font-medium text-gray-700">
                    Trẻ em:
                    <input
                        type="number"
                        value={children}
                        min={0}
                        onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value) || 0))}
                        className="ml-2 w-20 rounded border border-gray-300 px-2 py-1"
                    />
                </label>
            </div>
            <div className="mt-4">
                <label className="mb-1 block font-medium text-gray-700">Chọn ngày khởi hành</label>
                <input
                    type="date"
                    min={minDate}
                    value={selectedDate}
                    onChange={(e) => {
                        const inputDate = e.target.value
                        if (inputDate >= minDate) {
                            setSelectedDate(inputDate)
                        } else {
                            alert('Bạn không thể chọn ngày trước ' + minDate)
                            setSelectedDate(minDate)
                        }
                    }}
                    onKeyDown={(e) => e.preventDefault()}
                    className="w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    )
}

export default TourInfo
