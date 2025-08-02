import { createSlug } from '../../utils/slugHelper'
import TourCard from './TourCard'

const TourGrid = ({ tours, onCardClick }) => (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        {tours.map((tour) => {
            const slug = createSlug(tour.title)
            return (
                <TourCard
                    key={tour._id}
                    tour={tour}
                    onClick={() => onCardClick(slug)}
                />
            )
        })}
    </div>
)

export default TourGrid
