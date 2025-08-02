import Filters from './Filters'

const FilterSidebar = (props) => (
    <div className="hidden lg:block border-r border-gray-300 pr-6">
        <div className="sticky top-24 space-y-6">
            <Filters {...props} />
        </div>
    </div>
)

export default FilterSidebar
