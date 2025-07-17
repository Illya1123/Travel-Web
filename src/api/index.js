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

export { baseUrl, signup, signin }
