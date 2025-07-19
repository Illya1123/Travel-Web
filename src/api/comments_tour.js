import axios from 'axios'
import { baseUrl } from './index'

export const getCommentsByTourId = async (tourId) => {
    const res = await axios.get(`${baseUrl}/api/comments/tour/${tourId}`)
    return res.data
}

export const createComment = async (data) => {
    const res = await axios.post(`${baseUrl}/api/comments`, data)
    return res.data
}

export const updateComment = async (commentId, data) => {
    const res = await axios.put(`${baseUrl}/api/comments/${commentId}`, data)
    return res.data
}
