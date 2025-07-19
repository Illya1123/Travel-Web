export const reverseGeocode = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()

        return {
            street: data?.address?.road || data?.address?.name || '',
            province: data?.address?.city || data?.address?.state || '',
            ward: data?.address?.city_district || '',
        }
    } catch (error) {
        console.error('Lỗi gọi API reverse geocode:', error)
        throw error
    }
}
