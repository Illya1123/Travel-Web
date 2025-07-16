import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'
import './auth.css'
import { signup } from '../../api'
import { useState } from 'react'

const SignupForm = () => {
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
        <div className="form-container">
            <form className="infoform" onSubmit={formik.handleSubmit}>
                <h1 className="mb-4 text-center text-xl font-bold">Đăng ký</h1>

                <div className="mb-4">
                    <label>Họ và tên</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formik.values.fullName}
                        onChange={formik.handleChange}
                        placeholder="Nhập họ và tên"
                        className="input-field"
                    />
                    {formik.errors.fullName && <p className="errorMsg">{formik.errors.fullName}</p>}
                </div>

                <div className="mb-4">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Nhập email"
                        className="input-field"
                    />
                    {formik.errors.email && <p className="errorMsg">{formik.errors.email}</p>}
                </div>

                <div className="mb-4">
                    <label>Mật khẩu</label>
                    <input
                        type="password"
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        placeholder="Nhập mật khẩu"
                        className="input-field"
                    />
                    {formik.errors.password && <p className="errorMsg">{formik.errors.password}</p>}
                </div>

                <div className="mb-4">
                    <label>Xác nhận mật khẩu</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formik.values.confirmPassword}
                        onChange={formik.handleChange}
                        placeholder="Nhập lại mật khẩu"
                        className="input-field"
                    />
                    {formik.errors.confirmPassword && (
                        <p className="errorMsg">{formik.errors.confirmPassword}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    className={`submit-button ${formik.isValid && formik.dirty ? 'active' : ''}`}
                >
                    Đăng ký
                </button>
            </form>
        </div>
    )
}

export default SignupForm
