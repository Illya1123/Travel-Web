import axios from 'axios'
import { baseUrl } from './index'

// Tạo mới một xe
const createCar = async (carData) => {
    try {
        const response = await axios.post(`${baseUrl}/rental-car`, carData)
        return response.data
    } catch (error) {
        console.error('Create failed:', error.response?.data || error.message)
        throw error
    }
}

// Tạo nhiều xe cùng lúc
const createManyCars = async (carList) => {
    try {
        const response = await axios.post(`${baseUrl}/rental-car/bulk`, carList)
        return response.data
    } catch (error) {
        console.error('Bulk create failed:', error.response?.data || error.message)
        throw error
    }
}

// Lấy tất cả xe
const getAllCars = async () => {
    try {
        const response = await axios.get(`${baseUrl}/api/rental-car`)
        return response.data
    } catch (error) {
        console.error('Get all failed:', error.response?.data || error.message)
        throw error
    }
}

// Lấy chi tiết xe theo ID
const getCarById = async (id) => {
    try {
        const response = await axios.get(`${baseUrl}/rental-car/${id}`)
        return response.data
    } catch (error) {
        console.error('Get by ID failed:', error.response?.data || error.message)
        throw error
    }
}

// Cập nhật xe
const updateCar = async (id, updateData) => {
    try {
        const response = await axios.put(`${baseUrl}/rental-car/${id}`, updateData)
        return response.data
    } catch (error) {
        console.error('Update failed:', error.response?.data || error.message)
        throw error
    }
}

// Xoá xe
const deleteCar = async (id) => {
    try {
        const response = await axios.delete(`${baseUrl}/rental-car/${id}`)
        return response.data
    } catch (error) {
        console.error('Delete failed:', error.response?.data || error.message)
        throw error
    }
}

export { createCar, createManyCars, getAllCars, getCarById, updateCar, deleteCar }
