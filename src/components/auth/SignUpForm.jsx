import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { signup } from '../../api'
import './auth.css'
import { MdTravelExplore, MdAlternateEmail } from 'react-icons/md'
import { FaFingerprint, FaRegEye, FaRegEyeSlash, FaUser } from 'react-icons/fa'

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const togglePasswordView = () => setShowPassword((prev) => !prev)
    const toggleConfirmPasswordView = () => setShowConfirmPassword((prev) => !prev)

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Bắt buộc').min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
            email: Yup.string()
                .required('Bắt buộc')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Hãy nhập đúng định dạng email'),
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
                const data = {
                    name: values.fullName,
                    email: values.email,
                    password: values.password,
                }

                const response = await signup(data)

                if (response.success === true) {
                    Swal.fire({
                        title: 'Đăng ký thành công!',
                        text: 'Bạn đã đăng ký tài khoản thành công.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    })
                    formik.resetForm()
                }
            } catch (error) {
                Swal.fire({
                    title: 'Lỗi!',
                    text: error.message || 'Đã có lỗi xảy ra.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            }
        },
    })

    return (
        <section className="login relative h-screen w-full">
            <div className="overlay absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
            <video
                src='/videos/RegisterPage_3840x2160.mp4'
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
                    <h1 className="text-2xl font-semibold">Tạo tài khoản mới</h1>

                    <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-5">
                        <div className="flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <FaUser className="text-lg" />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Họ và tên"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                className="w-full border-0 bg-transparent text-base text-white placeholder-gray-400 outline-none"
                            />
                        </div>
                        {formik.errors.fullName && (
                            <p className="ml-2 text-sm text-red-500">{formik.errors.fullName}</p>
                        )}

                        <div className="flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <MdAlternateEmail className="text-lg" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="w-full border-0 bg-transparent text-base text-white placeholder-gray-400 outline-none"
                            />
                        </div>
                        {formik.errors.email && (
                            <p className="ml-2 text-sm text-red-500">{formik.errors.email}</p>
                        )}

                        <div className="relative flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <FaFingerprint className="text-lg" />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="Password"
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

                        <div className="relative flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <FaFingerprint className="text-lg" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                placeholder="Confirm Password"
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
                            <p className="ml-2 text-sm text-red-500">
                                {formik.errors.confirmPassword}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                            className={`w-full rounded-xl bg-blue-600 p-3 text-base text-white transition hover:bg-blue-700 ${
                                !(formik.isValid && formik.dirty) &&
                                'cursor-not-allowed opacity-50'
                            }`}
                        >
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignUpForm
