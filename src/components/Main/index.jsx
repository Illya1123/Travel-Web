import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllTours } from '../../api/tours'
import Filters from './Filters'
import TourCard from './TourCard'
import PaginationControls from './PaginationControls'

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
                if (tours) setData(tours)
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
        .filter((tour) => (selectedType ? tour.type === selectedType : true))
        .sort((a, b) => {
            if (sortOrder === 'asc') return a.price - b.price
            if (sortOrder === 'desc') return b.price - a.price
            return 0
        })

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const scrollToTop = () => {
        if (topPaginationRef.current) {
            topPaginationRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const handlePrev = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
            scrollToTop()
        }
    }, [currentPage])

    const handleNext = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
            scrollToTop()
        }
    }, [currentPage, totalPages])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') handleNext()
            else if (e.key === 'ArrowLeft') handlePrev()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleNext, handlePrev])

    return (
        <section className="w-full px-4 py-10 md:px-8 lg:px-16">
            <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 md:text-3xl">
                    Địa điểm thu hút khách du lịch nhất
                </h3>
            </div>

            <Filters
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                types={uniqueTypes}
                paginationRef={topPaginationRef}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePrev={handlePrev}
                handleNext={handleNext}
            />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                {currentData.map((tour) => (
                    <TourCard
                        key={tour._id}
                        tour={tour}
                        onClick={() => navigate(`/detail/${tour._id}`)}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            )}
        </section>
    )
}

export default Main
