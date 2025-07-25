import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {
    setCurrentUserAction,
    setCurrentUserName,
    setCurrentUserIsLogin,
} from '../../store/actions/index'
import { signin } from '../../api'
import { MdAlternateEmail, MdTravelExplore } from 'react-icons/md'
import { FaFingerprint, FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import './auth.css' // đảm bảo có CSS cho class `login`, `overlay`, `loginContent`,...

const SignInForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = useSelector((state) => state.isLogin)
    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordView = () => setShowPassword((prev) => !prev)

    useEffect(() => {
        const isLoginLocal = localStorage.getItem('isLogin') === 'true'
        const userData = JSON.parse(localStorage.getItem('userData'))
        const userName = JSON.parse(localStorage.getItem('name'))
        const accessToken = localStorage.getItem('accessToken')

        if (isLoginLocal && userData && userName && accessToken) {
            dispatch(setCurrentUserIsLogin(true))
            dispatch(setCurrentUserName(userName))
            dispatch(setCurrentUserAction(accessToken))
        }
    }, [dispatch])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Bắt buộc')
                .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Hãy nhập đúng định dạng email'),
            password: Yup.string()
                .required('Bắt buộc')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,19}$/,
                    'Mật khẩu phải chứa ít nhất 8 ký tự, một chữ cái, một số và một ký tự đặc biệt'
                ),
        }),
        onSubmit: async (values) => {
            try {
                const response = await signin(values)
                if (response.sucess === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully signed in!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => navigate('/'))
                    dispatch(setCurrentUserAction(response.accessToken))
                    dispatch(setCurrentUserName(response.userData.name))
                    dispatch(setCurrentUserIsLogin(true))
                    localStorage.setItem('name', JSON.stringify(response.userData.name))
                    localStorage.setItem('isLogin', true)
                    // localStorage.setItem('userId', response.userData.id)
                    localStorage.setItem('userData', JSON.stringify(response.userData))
                    localStorage.setItem('accessToken', response.accessToken)
                    formik.resetForm()
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message || 'Đăng nhập thất bại',
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            }
        },
    })

    return (
        <section className="login relative min-h-[calc(100vh-100px)] w-full">
            <div className="overlay absolute left-0 top-0 z-10 h-full w-full bg-black/40"></div>
            <video
                src="https://res.cloudinary.com/dnroxsd4n/video/upload/f_auto,q_auto,vc_auto/v1752994359/LoginPage_Ha_Long_Bay_3840x2160_shon1i.mp4"
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
                    <h1 className="text-2xl font-semibold">Chào mừng trở lại</h1>

                    <form onSubmit={formik.handleSubmit} className="flex w-full flex-col gap-5">
                        <div className="flex items-center gap-3 rounded-xl bg-gray-800 p-3">
                            <MdAlternateEmail className="text-lg" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className="w-full border-0 bg-transparent text-base text-white placeholder-gray-400 outline-none focus:bg-transparent focus:outline-none focus:ring-0"
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
                                className="w-full border-0 bg-transparent text-base text-white placeholder-gray-400 outline-none focus:bg-transparent focus:outline-none focus:ring-0"
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

                        <div className="text-right">
                            <Link
                                to="/forgot-password"
                                className="text-sm text-blue-400 underline hover:text-blue-300"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                            className={`w-full rounded-xl bg-blue-600 p-3 text-base text-white transition hover:bg-blue-700 ${
                                !(formik.isValid && formik.dirty) && 'cursor-not-allowed opacity-50'
                            }`}
                        >
                            Đăng nhập
                        </button>
                        <div className="text-center text-sm text-gray-300">
                            Bạn chưa có tài khoản?{' '}
                            <Link
                                to="/register"
                                className="text-blue-400 underline hover:text-blue-300"
                            >
                                Đăng ký ngay
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default SignInForm
