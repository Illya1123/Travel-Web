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
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
                <label className="mb-1 block font-medium">Loại tour:</label>
                <select
                    className="w-full rounded border px-3 py-2"
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
                <label className="invisible mb-1 block font-medium md:visible">Phân trang</label>
                <div ref={paginationRef}>
                    <PaginationControls
                        currentPage={currentPage}
                        totalPages={totalPages}
                        handlePrev={handlePrev}
                        handleNext={handleNext}
                    />
                </div>
            </div>
        </div>
    )
}

export default Filters
