import { useFormik } from 'formik'
import { useEffect } from 'react'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import './auth.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
    setCurrentUserAction,
    setCurrentUserName,
    setCurrentUserIsLogin,
} from '../../store/actions/index'
import { signin } from '../../api'

const SignInForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLogin = useSelector((state) => state.isLogin)

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
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,19}$/,
                    'Mật khẩu phải chứa ít nhất 8 ký tự, một chữ cái, một số và một ký tự đặc biệt'
                ),
        }),
        onSubmit: async (values) => {
            try {
                const response = await signin(values)
                if (response.sucess === true) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'You have successfully sign in!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate('/')
                    })
                    dispatch(setCurrentUserAction(response.accessToken))
                    dispatch(setCurrentUserName(response.userData.name))
                    dispatch(setCurrentUserIsLogin(true))
                    localStorage.setItem('name', JSON.stringify(response.userData.name))
                    localStorage.setItem('isLogin', true)
                    localStorage.setItem('userData', JSON.stringify(response.userData))
                    localStorage.setItem('accessToken', response.accessToken)
                    formik.resetForm()
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error!',
                    text: error.response?.data?.message,
                    icon: 'error',
                    confirmButtonText: 'OK',
                })
            }
        },
    })

    return (
        <div>
            {isLogin ? (
                <div className="form-container">
                    <h1>Đã đăng nhập</h1>
                    <p>Bạn đã đăng nhập thành công. Chào mừng bạn trở lại!</p>
                </div>
            ) : (
                <div className="form-container">
                    <form className="infoform" onSubmit={formik.handleSubmit}>
                        <h1 className="mb-4 text-center text-xl font-bold">Đăng nhập</h1>
                        <label> Địa chỉ email </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Enter your email"
                        />
                        {formik.errors.email && <p className="errorMsg"> {formik.errors.email} </p>}
                        <label> Mật khẩu </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            placeholder="Enter your password"
                        />
                        {formik.errors.password && (
                            <p className="errorMsg"> {formik.errors.password} </p>
                        )}
                        <button
                            type="submit"
                            disabled={!(formik.isValid && formik.dirty)}
                            className={`submit-button ${
                                formik.isValid && formik.dirty ? 'active' : ''
                            }`}
                        >
                            Continue
                        </button>
                    </form>
                </div>
            )}
        </div>
    )
}

export default SignInForm
