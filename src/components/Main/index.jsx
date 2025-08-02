import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllTours } from '../../api/tours'

import MainLayout from './MainLayout'
import FilterToggleButton from './FilterToggleButton'
import FilterSidebar from './FilterSidebar'
import FilterDrawer from './FilterDrawer'
import TourGrid from './TourGrid'
import PaginationControls from './PaginationControls'
import Loading from '../../components/Loading/Loading'

const ITEMS_PER_PAGE = 10

const Main = ({ searchKeyword, maxPrice }) => {
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedType, setSelectedType] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    const navigate = useNavigate()
    const topPaginationRef = useRef(null)
    const headerRef = useRef(null)

    const uniqueTypes = Array.from(new Set(data.map((tour) => tour.type).filter(Boolean)))

    useEffect(() => {
        getAllTours().then(setData).catch(console.error)
    }, [])

    useEffect(() => setCurrentPage(1), [searchKeyword, selectedType, sortOrder])

    const filteredData = data
        .filter((tour) => tour.title?.toLowerCase().includes(searchKeyword.toLowerCase()))
        .filter((tour) => (typeof tour.price === 'number' ? tour.price : 0) <= maxPrice)
        .filter((tour) => (selectedType ? tour.type === selectedType : true))
        .sort((a, b) => (sortOrder === 'asc' ? a.price - b.price : sortOrder === 'desc' ? b.price - a.price : 0))

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const currentData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    const scrollToTitle = () => {
        if (headerRef.current) {
            const offset = 100
            const pos = headerRef.current.getBoundingClientRect().top + window.pageYOffset - offset
            window.scrollTo({ top: pos, behavior: 'smooth' })
        }
    }

    const handlePrev = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1)
            scrollToTitle()
        }
    }, [currentPage])

    const handleNext = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1)
            scrollToTitle()
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

    useEffect(() => {
        document.body.style.overflow = isFilterOpen ? 'hidden' : ''
        return () => (document.body.style.overflow = '')
    }, [isFilterOpen])

    const filterProps = {
        selectedType, setSelectedType,
        sortOrder, setSortOrder,
        types: uniqueTypes,
        paginationRef: topPaginationRef,
        currentPage, totalPages,
        handlePrev, handleNext
    }

    if (data.length === 0) {
        return <Loading />;
    }

    return (
        <MainLayout headerRef={headerRef}>
            <FilterToggleButton onClick={() => setIsFilterOpen(true)} />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_3fr]">
                <FilterSidebar {...filterProps} />
                <div className="flex flex-col gap-6">
                    <TourGrid tours={currentData} onCardClick={(slug) => navigate(`/detail/${slug}`)} />
                    {totalPages > 1 && (
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            handlePrev={handlePrev}
                            handleNext={handleNext}
                        />
                    )}
                </div>
            </div>
            <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} {...filterProps} />
        </MainLayout>
    )
}

export default Main
