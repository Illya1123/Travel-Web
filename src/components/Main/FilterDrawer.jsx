import { IoClose } from 'react-icons/io5' // icon close đẹp

import Filters from './Filters'

const FilterDrawer = ({ isOpen, onClose, ...props }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/30 lg:hidden">
            <div className="h-full w-4/5 max-w-sm overflow-y-auto bg-white p-6 shadow-lg">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Bộ lọc</h2>
                    <button
                        className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                        onClick={onClose}
                        aria-label="Đóng bộ lọc"
                    >
                        <IoClose size={24} />
                    </button>
                </div>
                <Filters {...props} />
            </div>
        </div>
    )
}

export default FilterDrawer
