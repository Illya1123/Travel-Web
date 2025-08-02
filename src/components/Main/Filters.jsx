import React from 'react'
import PaginationControls from './PaginationControls'

const Filters = ({
    selectedType,
    setSelectedType,
    sortOrder,
    setSortOrder,
    types,
    paginationRef,
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
}) => {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <label className="mb-2 block font-semibold text-gray-700">Loại tour</label>
                <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">Tất cả</option>
                    {types.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label className="mb-2 block font-semibold text-gray-700">Sắp xếp theo giá</label>
                <select
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="">Mặc định</option>
                    <option value="asc">Tăng dần</option>
                    <option value="desc">Giảm dần</option>
                </select>
            </div>

            <div ref={paginationRef}>
                <label className="mb-2 block font-semibold text-gray-700">Phân trang</label>
                <PaginationControls
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePrev={handlePrev}
                    handleNext={handleNext}
                />
            </div>
        </div>
    )
}

export default Filters
