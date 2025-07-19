import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getTour, getAllTours } from '../../api/tours'
import TourImages from '../../components/TourDetail/TourImages'
import TourInfo from '../../components/TourDetail/TourInfo'
import RelatedTours from '../../components/TourDetail/RelatedTours'
import Comments from '../../components/TourDetail/Comments'

const Detail = () => {
    const { id } = useParams()
    const [tour, setTour] = useState(null)
    const [relatedTours, setRelatedTours] = useState([])
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const result = await getTour(id)
                if (result.status === 'success') setTour(result.data)
            } catch (error) {
                console.error('Lỗi khi lấy thông tin tour:', error)
            }
        }

        fetchTour()
        const storedUser = localStorage.getItem('userData')
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [id])

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

    if (!tour) return <div className="mt-10 text-center text-lg">Đang tải...</div>

    return (
        <div className="px-6 py-10">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
                <div className="flex flex-col gap-10 lg:w-3/5">
                    <TourImages tour={tour} />
                    <TourInfo tour={tour} />
                </div>
                <div className="flex flex-col gap-8 lg:w-2/5">
                    <RelatedTours relatedTours={relatedTours} />
                    <Comments user={user} tourId={tour._id} />
                </div>
            </div>
        </div>
    )
}

export default Detail
