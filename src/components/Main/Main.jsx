import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineLocationMarker, HiOutlineClipboardCheck } from 'react-icons/hi'
import { getAllTours } from '../../api/tours'

const ITEMS_PER_PAGE = 12

const Main = ({ searchKeyword, maxPrice }) => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedType, setSelectedType] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const navigate = useNavigate()
    const topPaginationRef = useRef(null)

    const uniqueTypes = Array.from(new Set(data.map((tour) => tour.type).filter(Boolean)))

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tours = await getAllTours()
                if (tours) {
                    setData(tours)
                }
            } catch (error) {
                console.error('Error fetching the data: ', error)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchKeyword, selectedType, sortOrder])

    const filteredData = data
        .filter((tour) => tour.title?.toLowerCase().includes(searchKeyword.toLowerCase()))
        .filter((tour) => {
            const tourPrice = typeof tour.price === 'number' ? tour.price : 0
            return tourPrice <= maxPrice
        })

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const scrollToPaginationTop = () => {
        if (topPaginationRef.current) {
            topPaginationRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
            scrollToPaginationTop()
        }
    }

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
            scrollToPaginationTop()
        }
    }

    const PaginationControls = () => (
        <div className="mt-6 flex justify-center gap-4">
            <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="rounded bg-sky-700 px-4 py-2 text-white disabled:opacity-50"
            >
                Trang trước
            </button>
            <span className="text-lg font-semibold leading-10">
                {currentPage} / {totalPages}
            </span>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="rounded bg-sky-700 px-4 py-2 text-white disabled:opacity-50"
            >
                Trang tiếp
            </button>
        </div>
    )

    return (
        <section className="w-full px-4 py-10 md:px-8 lg:px-16">
            <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    Địa điểm thu hút khách du lịch nhất
                </h3>
            </div>

            {/* ==== Bộ lọc trên cùng ==== */}
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div>
                    <label className="mb-1 block font-medium">Loại tour:</label>
                    <select
                        className="w-full rounded border px-3 py-2"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                    >
                        <option value="">Tất cả</option>
                        {uniqueTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="mb-1 block font-medium">Sắp xếp theo giá:</label>
                    <select
                        className="w-full rounded border px-3 py-2"
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option value="">Mặc định</option>
                        <option value="asc">Tăng dần</option>
                        <option value="desc">Giảm dần</option>
                    </select>
                </div>
                <div>
                    <label className="invisible mb-1 block font-medium md:visible">
                        Phân trang
                    </label>
                    <div ref={topPaginationRef}>
                        <PaginationControls />
                    </div>
                </div>
            </div>

            {/* ==== Danh sách tour ==== */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {currentData.map((tour) => (
                    <div
                        key={tour._id}
                        className="flex h-full flex-col justify-between overflow-hidden rounded-xl bg-white shadow transition hover:shadow-lg"
                    >
                        <div className="h-48 w-full overflow-hidden">
                            <img
                                src={tour.image || '/default-image.jpg'}
                                alt={tour.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="flex flex-1 flex-col justify-between p-4">
                            <h4 className="mb-1 text-lg font-semibold text-gray-800">
                                {tour.title}
                            </h4>

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
                                    {tour.price
                                        ? `${tour.price.toLocaleString()} vnđ`
                                        : 'Đang cập nhật'}
                                </div>
                            </div>

                            <button
                                className="mt-3 flex items-center justify-center gap-2 rounded bg-sky-700 px-4 py-2 text-white transition hover:bg-sky-800"
                                onClick={() => navigate(`/detail/${tour._id}`)}
                            >
                                <span>Chi tiết</span>
                                <HiOutlineClipboardCheck />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {totalPages > 1 && <PaginationControls />}
        </section>
    )
}

export default Main
