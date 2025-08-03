import React, { useEffect, useState } from 'react'
import { Car, ArrowRight } from 'lucide-react'
import CarCard from './FeaturedCars/CarCard'
import { getAllCars } from '../../api/rental_car'

const FeaturedCars = () => {
  const [cars, setCars] = useState([])
  const [filteredCars, setFilteredCars] = useState([])
  const [showAll, setShowAll] = useState(false)

  const [filters, setFilters] = useState({
    badges: '',
    fuel: '',
    seats: '',
    type: '',
  })

  const [filterOptions, setFilterOptions] = useState({
    badges: [],
    fuel: [],
    seats: [],
    type: [],
  })

  const visibleCars = showAll ? filteredCars : filteredCars.slice(0, 6)

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars()
        const carsWithImage = data.map((car) => ({
          ...car,
          image: car.image?.[0] || '',
        }))

        // Lấy các giá trị duy nhất từ từng trường
        const extractUnique = (key) => [
          ...new Set(
            carsWithImage
              .map((car) => car[key])
              .flat()
              .filter(Boolean)
          ),
        ]

        setCars(carsWithImage)
        setFilteredCars(carsWithImage)
        setFilterOptions({
          badges: extractUnique('badges'),
          fuel: extractUnique('fuel'),
          seats: extractUnique('seats'),
          type: extractUnique('type'),
        })
      } catch (error) {
        console.error('Lỗi khi tải xe:', error.response?.data || error.message)
      }
    }

    fetchCars()
  }, [])

  // Cập nhật filteredCars mỗi khi filters thay đổi
  useEffect(() => {
    const result = cars.filter((car) => {
      const badgeMatch =
        filters.badges === '' ||
        (Array.isArray(car.badges)
          ? car.badges.includes(filters.badges)
          : car.badges === filters.badges)
      return (
        badgeMatch &&
        (filters.fuel === '' || car.fuel === filters.fuel) &&
        (filters.seats === '' || car.seats === Number(filters.seats)) &&
        (filters.type === '' || car.type === filters.type)
      )
    })
    setFilteredCars(result)
  }, [filters, cars])

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

      {/* Bộ lọc */}
      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
        {Object.entries(filterOptions).map(([key, options]) => (
          <select
            key={key}
            value={filters[key]}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, [key]: e.target.value }))
            }
            className="w-full rounded border p-2"
          >
            <option value="">Tất cả {key}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {String(option)}
              </option>
            ))}
          </select>
        ))}
      </div>

      {/* Danh sách xe */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {visibleCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {/* Nút xem tất cả / thu gọn */}
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
