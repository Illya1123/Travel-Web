import axios from 'axios'

const baseUrl = `http://192.168.31.228:3000`

const signup = async (param) => {
    const data = {
        name: param.name,
        email: param.email,
        password: param.password,
    }

    try {
        const response = await axios.post(`${baseUrl}/api/user/register`, data)
        console.log('Signup successful:', response.data)
        return response.data
    } catch (error) {
        console.error('Signup failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const signin = async (param) => {
    const data = {
        email: param.email,
        password: param.password,
    }

    try {
        const response = await axios.post(`${baseUrl}/api/user/login`, data)
        console.log('Signin successful:', response.data)
        return response.data
    } catch (error) {
        console.error('Signin failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const updateUserInfo = (data) => {
    const accessToken = localStorage.getItem('accessToken')
    return axios.put(`${baseUrl}/api/user/`, data, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}

const resetPassword = async ({ password, token }) => {
    try {
        const res = await axios.put(`${baseUrl}/api/user/resetpassword`, { password, token })
        return res.data
    } catch (error) {
        console.error('Lỗi gọi API reset password:', error)
        return { success: false, message: 'Lỗi khi gửi yêu cầu đổi mật khẩu.' }
    }
}

const forgotPassword = async (email) => {
    try {
        const res = await axios.get(`${baseUrl}/api/user/forgotpassword?email=${email}`)
        return res.data
    } catch (err) {
        return { success: false, message: err.response?.data?.message || 'Lỗi server' }
    }
}

export { baseUrl, signup, signin, updateUserInfo, resetPassword, forgotPassword }
