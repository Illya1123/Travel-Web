import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAllTours } from '../../api/tours'
import TourImages from '../../components/TourDetail/TourImages'
import TourInfo from '../../components/TourDetail/TourInfo'
import RelatedTours from '../../components/TourDetail/RelatedTours'
import Comments from '../../components/TourDetail/Comments'
import { createSlug } from '../../utils/slugHelper'
import Loading from '../../components/Loading/Loading'

const Detail = () => {
    const { slug } = useParams()
    const [tour, setTour] = useState(null)
    const [relatedTours, setRelatedTours] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        // Reset tour mỗi khi slug thay đổi để đảm bảo reload dữ liệu mới
        setTour(null)

        const fetchTour = async () => {
            try {
                const all = await getAllTours()
                const matched = all.find((t) => createSlug(t.title) === slug)
                if (matched) {
                    const normalizedImage = Array.isArray(matched.image)
                        ? matched.image
                        : matched.image
                        ? [matched.image]
                        : []

                    setTour({ ...matched, image: normalizedImage })
                }
            } catch (err) {
                console.error('Lỗi lấy tour:', err)
            }
        }

        fetchTour()

        const storedUser = localStorage.getItem('userData')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [slug]) // <--- khi slug thay đổi, reset tour + fetch lại

    useEffect(() => {
        const fetchRelatedTours = async () => {
            try {
                const allTours = await getAllTours()
                if (allTours && tour) {
                    const related = allTours
                        .filter(
                            (t) =>
                                t._id !== tour._id &&
                                t.type === tour.type &&
                                (t.title.includes(tour.title.split(' ')[0]) ||
                                    tour.title.includes(t.title.split(' ')[0]))
                        )
                        .slice(0, 4)
                    setRelatedTours(related)
                }
            } catch (error) {
                console.error('Lỗi khi lấy các tour liên quan:', error)
            }
        }

        if (tour) fetchRelatedTours()
    }, [tour])

    if (!tour) return <Loading />

    return (
 <div className="px-6 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
            {/* Cột trái */}
            <div className="flex flex-col gap-10 lg:w-3/5">
                <TourImages tour={tour} />
                <TourInfo tour={tour} />
            </div>

            {/* Đường kẻ dọc chỉ hiện trên desktop */}
            <div className="hidden lg:block w-px bg-gray-300 mx-2 self-stretch" />

            {/* Cột phải */}
            <div className="flex flex-col gap-8 lg:w-2/5">
                <RelatedTours relatedTours={relatedTours} />
                <Comments user={user} tourId={tour._id} />
            </div>
        </div>
    </div>
    )
}

export default Detail
