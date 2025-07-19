import React, { useState } from 'react'

const Comments = ({ user }) => {
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

    return (
        <div className="mt-4">
            <h3 className="mb-2 text-xl font-semibold text-orange-500">💬 Bình luận</h3>
            <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-3 focus:outline-orange-500"
                rows={3}
                placeholder={
                    user ? 'Nhập bình luận của bạn...' : 'Bạn cần đăng nhập để bình luận'
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

            <div className="space-y-4 mt-4">
                {comments.map((cmt, idx) => (
                    <div key={idx} className="flex items-start gap-3 border-b pb-3">
                        {cmt.avatar && (
                            <img src={cmt.avatar} alt={cmt.name} className="h-10 w-10 rounded-full object-cover" />
                        )}
                        <div>
                            <p className="font-semibold text-gray-800">{cmt.name}</p>
                            <p className="text-gray-600">{cmt.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments
