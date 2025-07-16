import React, { useEffect, useState } from 'react'
import './detail.css'
import { useParams, useNavigate } from 'react-router-dom'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { FcRating } from 'react-icons/fc'
import { TbMoneybag } from 'react-icons/tb'
import { getTour, getAllTours } from '../../api/tours'
import ImageGallery from 'react-image-gallery'
import 'react-image-gallery/styles/css/image-gallery.css'

const Detail = () => {
    const { id } = useParams()
    const [tour, setTour] = useState(null)
    const [relatedTours, setRelatedTours] = useState([])
    const [commentInput, setCommentInput] = useState('')
    const [comments, setComments] = useState([
        {
            name: 'Nguyễn Văn A',
            avatar: '',
            text: 'Tour rất tuyệt vời, hướng dẫn viên thân thiện!',
        },
        {
            name: 'Trần Thị B',
            avatar: '',
            text: 'Phong cảnh rất đẹp, đáng trải nghiệm!',
        },
    ])
    const [adults, setAdults] = useState(1)
    const [children, setChildren] = useState(0)
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTour = async () => {
            try {
                const result = await getTour(id)
                if (result.status === 'success') {
                    setTour(result.data)
                }
            } catch (error) {
                console.error('Lỗi khi lấy thông tin tour:', error)
            }
        }

        fetchTour()

        const storedUser = localStorage.getItem('userData')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
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

        if (tour) {
            fetchRelatedTours()
        }
    }, [tour])

    const handleCommentSubmit = () => {
        if (!user) return alert('Bạn cần đăng nhập để bình luận.')

        if (commentInput.trim() !== '') {
            setComments((prev) => [
                ...prev,
                { name: user.name || 'Bạn', avatar: user.avatar || '', text: commentInput },
            ])
            setCommentInput('')
        }
    }

    if (!tour) {
        return <div className="mt-10 text-center text-lg">Đang tải...</div>
    }

    const images = [tour.image, ...(tour.images || [])].map((img) => ({
        original: img,
        thumbnail: img,
    }))

    const columns = 3
    const serviceRows = []
    if (tour.services?.length > 0) {
        for (let i = 0; i < tour.services.length; i += columns) {
            serviceRows.push(tour.services.slice(i, i + columns))
        }
    }

    const totalPrice = Math.round(tour.price * adults + tour.price * 0.8 * children)

    return (
        <div className="px-6 py-10">
            <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
                {/* Bên trái: ảnh + nội dung chi tiết */}
                <div className="flex flex-col gap-10 lg:w-3/5">
                    <ImageGallery
                        items={images}
                        showPlayButton={false}
                        showFullscreenButton={true}
                    />

                    {/* Nội dung chi tiết */}
                    <div className="flex flex-col gap-4">
                        <div>
                            <span className="text-black-600 text-xl font-bold">Loại tour: </span>
                            <span className="font-semibold text-orange-600">{tour.type}</span>
                            <h1 className="text-3xl font-bold">{tour.title}</h1>
                        </div>

                        <div className="flex flex-col gap-4 rounded-lg bg-yellow-50 p-4 shadow">
                            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-3">
                                <div className="text-xl font-bold text-red-600">
                                    Tổng: {totalPrice.toLocaleString()} VNĐ
                                    <p className="mt-1 text-sm font-medium text-gray-600">
                                        Giảm 20% cho khách trẻ em (dưới 6 tuổi)
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <label className="text-sm font-medium">Người lớn:</label>
                                        <input
                                            type="number"
                                            value={adults}
                                            min={1}
                                            className="ml-2 w-16 rounded border px-2 py-1"
                                            onChange={(e) =>
                                                setAdults(
                                                    Math.max(1, parseInt(e.target.value) || 1)
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Trẻ em:</label>
                                        <input
                                            type="number"
                                            value={children}
                                            min={0}
                                            className="ml-2 w-16 rounded border px-2 py-1"
                                            onChange={(e) =>
                                                setChildren(
                                                    Math.max(0, parseInt(e.target.value) || 0)
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                <button className="animate-pulse rounded-xl bg-orange-500 px-10 py-3 font-semibold text-white transition hover:bg-orange-600">
                                    ĐẶT NGAY
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 rounded-lg bg-gray-50 p-4 text-gray-800 shadow-sm md:grid-cols-2">
                            <div className="flex items-center gap-2">
                                <HiOutlineLocationMarker className="text-xl text-orange-500" />
                                <span className="font-medium">{tour.country}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FcRating className="text-xl" />
                                <span className="font-medium">
                                    {tour.score} - {tour.score_description}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xl">📅</span>
                                <span className="font-medium">{tour.date}</span>
                            </div>
                        </div>

                        <h3 className="mt-4 text-xl font-semibold text-orange-500">📝 Tổng quan</h3>
                        <ul className="list-disc space-y-2 pl-5 text-xl text-gray-700 lg:text-xl">
                            {tour.overview?.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>

                        <h3 className="mt-6 text-xl font-semibold text-orange-500">
                            ✅ Dịch vụ bao gồm
                        </h3>
                        <table className="w-full table-auto border-collapse border border-gray-300 text-gray-700">
                            <tbody>
                                {serviceRows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="border-b border-gray-200">
                                        {row.map((service, colIndex) => (
                                            <td key={colIndex} className="w-1/3 px-4 py-2">
                                                {service}
                                            </td>
                                        ))}
                                        {row.length < columns &&
                                            Array.from({ length: columns - row.length }).map(
                                                (_, idx) => (
                                                    <td
                                                        key={`empty-${idx}`}
                                                        className="w-1/3 px-4 py-2"
                                                    ></td>
                                                )
                                            )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bên phải: Tour liên quan + Bình luận */}
                <div className="flex flex-col gap-8 lg:w-2/5">
                    <div>
                        <h3 className="mb-2 text-lg font-semibold text-orange-600">
                            🧭 Các tour liên quan
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            {relatedTours.map((t) => (
                                <div
                                    key={t._id}
                                    className="cursor-pointer overflow-hidden rounded-lg bg-white shadow transition hover:shadow-md"
                                    onClick={() => navigate(`/detail/${t._id}`)}
                                >
                                    <img
                                        src={t.image}
                                        alt={t.title}
                                        className="h-36 w-full object-cover"
                                    />
                                    <div className="p-3">
                                        <h4 className="font-semibold text-gray-800">{t.title}</h4>
                                        <p className="text-sm text-red-600 font-bold">
                                            Giá: {t.price.toLocaleString()} ₫
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bình luận */}
                    <div className="mt-4">
                        <h3 className="mb-2 text-xl font-semibold text-orange-500">💬 Bình luận</h3>
                        <div className="mb-4">
                            <textarea
                                value={commentInput}
                                onChange={(e) => setCommentInput(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-orange-500"
                                rows={3}
                                placeholder={
                                    user
                                        ? 'Nhập bình luận của bạn...'
                                        : 'Bạn cần đăng nhập để bình luận'
                                }
                                disabled={!user}
                            />
                            <button
                                onClick={handleCommentSubmit}
                                className="mt-2 rounded bg-orange-500 px-6 py-2 font-semibold text-white transition hover:bg-orange-600"
                                disabled={!user}
                            >
                                Gửi bình luận
                            </button>
                        </div>
                        <div className="space-y-4">
                            {comments.map((cmt, idx) => (
                                <div key={idx} className="flex items-start gap-3 border-b pb-3">
                                    {cmt.avatar && (
                                        <img
                                            src={cmt.avatar}
                                            alt={cmt.name}
                                            className="h-10 w-10 rounded-full object-cover"
                                        />
                                    )}
                                    <div>
                                        <p className="font-semibold text-gray-800">{cmt.name}</p>
                                        <p className="text-gray-600">{cmt.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail
