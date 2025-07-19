import React, { useState } from 'react'
import { forgotPassword } from '../../api'
import Swal from 'sweetalert2'
import { MdAlternateEmail, MdTravelExplore } from 'react-icons/md'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Vui lòng nhập email!',
            })
            return
        }

        setLoading(true)
        try {
            const res = await forgotPassword(email)
            if (res.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Đã gửi thành công!',
                    text: 'Hãy kiểm tra email của bạn để đặt lại mật khẩu.',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi!',
                    text: res.message || 'Không thể gửi email khôi phục.',
                })
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: err.message || 'Không thể gửi email.',
            })
        }
        setLoading(false)
    }

    return (
        <section className="login relative min-h-[calc(100vh-100px)] w-full">
            <div className="overlay absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
            <video
                src="/videos/Forgot-password1920x1080.mp4"
                type="video/mp4"
                loop
                autoPlay
                muted
                preload="auto"
                playsInline
                className="absolute left-0 top-0 z-0 h-full w-full object-cover"
            ></video>

            <div className="loginContent relative z-20 flex min-h-[calc(100vh-100px)] w-full items-center justify-center">
                <div className="flex w-[90%] max-w-md flex-col items-center gap-6 rounded-2xl bg-gray-900/80 p-8 text-white shadow-2xl backdrop-blur-md md:max-w-lg md:p-10">
                    <div className="mb-2 flex items-center gap-2 text-3xl font-bold text-sky-700">
                        <MdTravelExplore />
                        <span>Travel</span>
                    </div>
                    <h1 className="text-xl font-semibold">🔐 Quên mật khẩu?</h1>
                    <p className="text-center text-sm text-gray-300">
                        Nhập email để chúng tôi gửi liên kết đặt lại mật khẩu cho bạn.
                    </p>

                    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-5">
                        <div className="flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <MdAlternateEmail className="text-lg" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border-0 bg-transparent text-base text-white placeholder-gray-400 outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!email || loading}
                            className={`w-full rounded-xl bg-blue-600 p-3 text-base text-white transition hover:bg-blue-700 ${
                                !email || loading ? 'cursor-not-allowed opacity-50' : ''
                            }`}
                        >
                            {loading ? 'Đang gửi...' : 'Gửi yêu cầu'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgetPassword
