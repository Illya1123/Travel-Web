// src/api/upload.js
import axios from 'axios'
import { baseUrl } from './index'

export const uploadAvatar = async (file) => {
    const formData = new FormData()
    formData.append('avatar', file)

    const response = await axios.post(`${baseUrl}/api/upload/avatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })

    return response.data
}
