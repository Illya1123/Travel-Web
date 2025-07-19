import React, { useEffect, useState } from 'react'
import { getCommentsByTourId, createComment, updateComment } from '../../api/comments_tour'
import Rating from 'react-rating-stars-component'

const Comments = ({ user, tourId }) => {
    const [comments, setComments] = useState([])
    const [filteredComments, setFilteredComments] = useState([])
    const [commentInput, setCommentInput] = useState('')
    const [rating, setRating] = useState(5)
    const [editingId, setEditingId] = useState(null)
    const [filterStar, setFilterStar] = useState('all')
    const [sortOrder, setSortOrder] = useState('desc') // desc: mới nhất, asc: cũ nhất

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await getCommentsByTourId(tourId)
                if (res.status === 'success') {
                    setComments(res.data)
                }
            } catch (err) {
                console.error('Lỗi khi lấy bình luận:', err)
            }
        }

        if (tourId) fetchComments()
    }, [tourId])

    useEffect(() => {
        let filtered = [...comments]

        if (filterStar !== 'all') {
            const star = parseInt(filterStar)
            filtered = filtered.filter((c) => Math.floor(c.rating) === star)
        }

        filtered.sort((a, b) => {
            const timeA = new Date(a.createdAt).getTime()
            const timeB = new Date(b.createdAt).getTime()
            return sortOrder === 'asc' ? timeA - timeB : timeB - timeA
        })

        setFilteredComments(filtered)
    }, [comments, filterStar, sortOrder])

    const handleSubmit = async () => {
        if (!user) return alert('Bạn cần đăng nhập để bình luận.')
        if (!commentInput.trim()) return

        try {
            if (editingId) {
                const res = await updateComment(editingId, {
                    userId: user._id,
                    comment: commentInput,
                    rating,
                })

                if (res.status === 'success') {
                    setComments((prev) =>
                        prev.map((c) =>
                            c._id === editingId
                                ? {
                                      ...c,
                                      comment: commentInput,
                                      rating,
                                      updatedAt: new Date().toISOString(),
                                  }
                                : c
                        )
                    )
                    setEditingId(null)
                }
            } else {
                const res = await createComment({
                    userId: user._id,
                    tourId,
                    comment: commentInput,
                    rating,
                })
                if (res.status === 'success') {
                    setComments((prev) => [res.data, ...prev])
                }
            }

            setCommentInput('')
            setRating(5)
        } catch (err) {
            console.error('Lỗi khi gửi/sửa bình luận:', err)
        }
    }

    const handleEdit = (comment) => {
        setEditingId(comment._id)
        setCommentInput(comment.comment)
        setRating(comment.rating)
    }

    const handleCancel = () => {
        setEditingId(null)
        setCommentInput('')
        setRating(5)
    }

    return (
        <div className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-2xl font-semibold text-orange-500">💬 Bình luận</h3>

            {/* Form nhập bình luận */}
            <div className="mb-6">
                <textarea
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="w-full rounded-md border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows={3}
                    placeholder={
                        user ? 'Nhập bình luận của bạn...' : 'Bạn cần đăng nhập để bình luận'
                    }
                    disabled={!user}
                />
                <div className="mt-2 flex flex-col items-end gap-2 md:flex-row md:items-center md:justify-between">
                    <Rating
                        count={5}
                        value={rating}
                        size={28}
                        isHalf={true}
                        onChange={(value) => setRating(value)}
                        activeColor="#facc15"
                    />
                    <div className="flex gap-2">
                        {editingId && (
                            <button
                                onClick={handleCancel}
                                className="rounded-md border border-gray-400 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            >
                                Hủy
                            </button>
                        )}
                        <button
                            onClick={handleSubmit}
                            className="rounded-md bg-orange-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-orange-600"
                            disabled={!user}
                        >
                            {editingId ? 'Cập nhật' : 'Gửi bình luận'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bộ lọc */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Lọc theo sao:</label>
                    <select
                        value={filterStar}
                        onChange={(e) => setFilterStar(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-1 text-sm"
                    >
                        <option value="all">Tất cả</option>
                        {[5, 4, 3, 2, 1].map((s) => (
                            <option key={s} value={s}>
                                {s} sao
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600">Sắp xếp:</label>
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="rounded border border-gray-300 px-3 py-1 text-sm"
                    >
                        <option value="desc">Mới nhất</option>
                        <option value="asc">Cũ nhất</option>
                    </select>
                </div>
            </div>

            {/* Danh sách bình luận */}
            <div className="space-y-4">
                {filteredComments.map((cmt) => {
                    const isEdited =
                        new Date(cmt.createdAt).getTime() !== new Date(cmt.updatedAt).getTime()
                    return (
                        <div
                            key={cmt._id}
                            className="flex items-start gap-4 rounded-md bg-gray-50 p-4 shadow-sm hover:shadow-md"
                        >
                            <img
                                src={cmt.user.avatar || '/default-avatar.png'}
                                alt={cmt.user.name}
                                className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="text-base font-semibold text-gray-800">
                                        {cmt.user.name}
                                    </p>
                                    {user && cmt.user._id === user._id && (
                                        <button
                                            onClick={() => handleEdit(cmt)}
                                            className="text-sm text-blue-500 hover:underline"
                                        >
                                            ✏️ Chỉnh sửa
                                        </button>
                                    )}
                                </div>
                                <div className="mt-1 text-sm text-gray-700">{cmt.comment}</div>
                                <div className="mt-1 text-sm text-yellow-500">
                                    {'⭐'.repeat(Math.floor(cmt.rating))}
                                    {cmt.rating % 1 ? '½' : ''} ({cmt.rating})
                                </div>
                                <div className="text-xs text-gray-400">
                                    {new Date(cmt.createdAt).toLocaleString()}
                                    {isEdited && (
                                        <span className="ml-1 italic text-gray-500">
                                            • Đã chỉnh sửa
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Comments
