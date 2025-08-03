import React, { useEffect, useState } from 'react'
import { Car, ArrowRight } from 'lucide-react'
import CarCard from './FeaturedCars/CarCard'
import { getAllCars } from '../../api/rental_car' // Sử dụng hàm API

const FeaturedCars = () => {
  const [cars, setCars] = useState([])
  const [showAll, setShowAll] = useState(false)

  const visibleCars = showAll ? cars : cars.slice(0, 6)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars()
        const carsWithImage = data.map((car) => ({
          ...car,
          image: car.image?.[0] || '', // dùng ảnh đầu tiên nếu có
        }))
        setCars(carsWithImage)
      } catch (error) {
        console.error('Lỗi khi tải xe:', error.response?.data || error.message)
      }
    }

    fetchCars()
  }, [])

  return (
    <section className="bg-gray-100 px-4 py-20 sm:px-16">
      <div className="head-reveal mx-auto mb-12 max-w-7xl text-center">
        <h2 className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold sm:text-4xl">
          <span className="text-blue-500">
            <Car className="h-12 w-12" />
          </span>
          <span className="text-gray-800">Xe nổi bật</span>
        </h2>
        <p className="text-lg text-gray-600">
          Khám phá những mẫu xe được lựa chọn kỹ lưỡng, phù hợp cho mọi hành trình của bạn
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visibleCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="mx-auto flex items-center justify-center gap-1 rounded bg-blue-500 px-5 py-3 text-white transition duration-300 hover:bg-blue-700"
        >
          {showAll ? 'Thu gọn' : 'Xem tất cả xe'} <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default FeaturedCars
