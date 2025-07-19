import React from 'react'

const PaginationControls = ({ currentPage, totalPages, handlePrev, handleNext }) => (
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

export default PaginationControls
