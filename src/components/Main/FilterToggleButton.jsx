import { FiFilter } from 'react-icons/fi'

const FilterToggleButton = ({ onClick }) => (
    <div className="mb-6 block lg:hidden text-right">
        <button
            onClick={onClick}
            className="inline-flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-gray-100 hover:shadow-md transition-all duration-150"
        >
            <FiFilter size={18} />
            <span>Bộ lọc</span>
        </button>
    </div>
)

export default FilterToggleButton
