import axios from 'axios'

const getAddressFromLatLng = async (lat, lon) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=jsonv2`
    try {
        const response = await axios.get(url)
        if (response.data && response.data.display_name) {
            return response.data.display_name // Địa chỉ đầy đủ
        } else {
            return 'Không tìm thấy địa chỉ'
        }
    } catch (error) {
        console.error('Lỗi khi gọi OpenStreetMap API:', error)
        return 'Không tìm thấy địa chỉ'
    }
}

export default getAddressFromLatLng
