import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'
import * as Yup from 'yup'
import { resetPassword } from '../../api'
import { MdTravelExplore } from 'react-icons/md'
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const ResetPassword = () => {
    const { token } = useParams()
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [message, setMessage] = useState('')

    const togglePasswordView = () => setShowPassword((prev) => !prev)
    const toggleConfirmPasswordView = () => setShowConfirmPassword((prev) => !prev)

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Bắt buộc')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,19}$/,
                    'Mật khẩu phải chứa ít nhất 8 ký tự, một chữ cái, một số và một ký tự đặc biệt'
                ),
            confirmPassword: Yup.string()
                .required('Bắt buộc')
                .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp'),
        }),
        onSubmit: async (values) => {
    try {
        const res = await resetPassword({ password: values.password, token })
        if (res.success) {
            Swal.fire({
                title: 'Thành công!',
                text: 'Mật khẩu đã được đặt lại. Vui lòng đăng nhập lại.',
                icon: 'success',
                confirmButtonText: 'Đăng nhập',
            }).then(() => {
                navigate('/login')
            })
        } else {
            setMessage('Lỗi: ' + (res.message || 'Không thể đổi mật khẩu.'))
        }
    } catch (err) {
        setMessage('Lỗi hệ thống. Vui lòng thử lại.')
    }
}

    })

    return (
        <section className="login relative h-screen w-full">
            <div className="overlay absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
            <video
                src="/videos/ChangePassword_Hanoi_Timelapse_3840x2160.mp4"
                type="video/mp4"
                loop
                autoPlay
                muted
                preload="auto"
                playsInline
                className="absolute left-0 top-0 z-0 h-full w-full object-cover"
            ></video>

            <div className="loginContent relative z-20 flex h-full w-full items-center justify-center">
                <div className="flex w-[90%] max-w-md flex-col items-center gap-6 rounded-2xl bg-gray-900/80 p-8 text-white shadow-2xl backdrop-blur-md md:max-w-lg md:p-10">
                    <div className="mb-2 flex items-center gap-2 text-3xl font-bold text-sky-700">
                        <MdTravelExplore />
                        <span>Travel</span>
                    </div>
                    <h1 className="text-2xl font-semibold">🔒 Đặt lại mật khẩu</h1>

                    {message && <p className="text-sm text-red-400">{message}</p>}

                    <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-5">
                        {/* Password */}
                        <div className="relative flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <FaFingerprint className="text-lg" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Mật khẩu mới"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="w-full border-0 bg-transparent text-base text-white placeholder-gray-400 outline-none"
                            />
                            {showPassword ? (
                                <FaRegEyeSlash
                                    className="absolute right-4 cursor-pointer text-lg"
                                    onClick={togglePasswordView}
                                />
                            ) : (
                                <FaRegEye
                                    className="absolute right-4 cursor-pointer text-lg"
                                    onClick={togglePasswordView}
                                />
                            )}
                        </div>
                        {formik.errors.password && (
                            <p className="ml-2 text-sm text-red-500">{formik.errors.password}</p>
                        )}

                        {/* Confirm Password */}
                        <div className="relative flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <FaFingerprint className="text-lg" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Xác nhận mật khẩu"
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                className="w-full border-0 bg-transparent text-base text-white placeholder-gray-400 outline-none"
                            />
                            {showConfirmPassword ? (
                                <FaRegEyeSlash
                                    className="absolute right-4 cursor-pointer text-lg"
                                    onClick={toggleConfirmPasswordView}
                                />
                            ) : (
                                <FaRegEye
                                    className="absolute right-4 cursor-pointer text-lg"
                                    onClick={toggleConfirmPasswordView}
                                />
                            )}
                        </div>
                        {formik.errors.confirmPassword && (
                            <p className="ml-2 text-sm text-red-500">{formik.errors.confirmPassword}</p>
                        )}

                        <button
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                            className={`w-full rounded-xl bg-orange-500 p-3 text-base text-white transition hover:bg-orange-600 ${
                                !(formik.isValid && formik.dirty) && 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            Xác nhận
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword
