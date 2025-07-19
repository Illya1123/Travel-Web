import React, { useState, useEffect } from 'react'
import { FaUser, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { MdAlternateEmail } from 'react-icons/md'
import locationData from '../../../api/data/old_country/country.json'
import { reverseGeocode } from '../../../api/locationApi'

import ReadonlyInput from './ReadonlyInput'
import PhoneInput from './PhoneInput'
import AddressForm from './AddressForm'

const UserInfoForm = ({ user, setUser, phoneError, setPhoneError, validatePhoneVN }) => {
    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])
    const [useGPS, setUseGPS] = useState(false)

    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')
    const [street, setStreet] = useState('')

    useEffect(() => {
        if (Array.isArray(locationData)) {
            setProvinces(locationData)
        } else {
            console.error('Dữ liệu locationData không hợp lệ:', locationData)
        }
    }, [])

    useEffect(() => {
        const province = provinces.find((p) => p.code === +selectedProvince)
        setDistricts(province?.districts || [])

        if (!useGPS) {
            setSelectedDistrict('')
            setSelectedWard('')
        }
        setWards([])
    }, [selectedProvince])

    useEffect(() => {
        const district = districts.find((d) => d.code === +selectedDistrict)
        setWards(district?.wards || [])

        // Chỉ reset ward khi không dùng GPS
        if (!useGPS) {
            setSelectedWard('')
        }
    }, [selectedDistrict])

    useEffect(() => {
        const provinceName = useGPS
            ? selectedProvince
            : provinces.find((p) => p.code === +selectedProvince)?.name || ''
        const districtName = useGPS
            ? ''
            : districts.find((d) => d.code === +selectedDistrict)?.name || ''
        const wardName = useGPS
            ? selectedWard
            : wards.find((w) => w.code === +selectedWard)?.name || ''

        if (street && wardName && provinceName) {
            const fullAddress = `${street}, ${wardName}${districtName ? ', ' + districtName : ''}, ${provinceName}`
            setUser((prevUser) => ({
                ...prevUser,
                address: fullAddress,
            }))
        } else {
            setUser((prevUser) => ({
                ...prevUser,
                address: '',
            }))
        }
    }, [street, selectedProvince, selectedDistrict, selectedWard, useGPS])

    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Trình duyệt không hỗ trợ định vị GPS')
            return
        }

        // Reset trước khi lấy dữ liệu mới
        setStreet('')
        setSelectedProvince('')
        setSelectedDistrict('')
        setSelectedWard('')
        setUseGPS(true)

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords
                try {
                    const {
                        street: road,
                        province: city,
                        ward,
                    } = await reverseGeocode(latitude, longitude)

                    setStreet(road)
                    setSelectedProvince(city)
                    setSelectedWard(ward)
                    setSelectedDistrict('') // không có từ GPS
                } catch (error) {
                    alert('Không thể lấy địa chỉ hiện tại')
                }
            },
            (error) => {
                console.error('Lỗi định vị:', error)
                alert('Không thể truy cập vị trí. Hãy bật GPS hoặc cho phép trình duyệt truy cập.')
            }
        )
    }

    return (
        <div className="rounded-2xl border bg-white p-6 shadow-lg">
            <h2 className="mb-6 text-xl font-semibold text-gray-700">Thông tin người đặt</h2>
            <ReadonlyInput icon={FaUser} value={user?.name} placeholder="Họ và tên" />
            <ReadonlyInput icon={MdAlternateEmail} value={user?.email} placeholder="Email" />
            <PhoneInput
                value={user?.phone}
                onChange={(e) => {
                    const newPhone = e.target.value
                    setUser({ ...user, phone: newPhone })
                    if (!validatePhoneVN(newPhone)) {
                        setPhoneError(
                            'Số điện thoại không hợp lệ (VD: 0901234567 hoặc +84901234567)'
                        )
                    } else {
                        setPhoneError('')
                    }
                }}
                error={phoneError}
            />
            <AddressForm
                {...{
                    useGPS,
                    setUseGPS,
                    provinces,
                    districts,
                    wards,
                    selectedProvince,
                    setSelectedProvince,
                    selectedDistrict,
                    setSelectedDistrict,
                    selectedWard,
                    setSelectedWard,
                    street,
                    setStreet,
                    handleGetCurrentLocation,
                }}
            />
        </div>
    )
}

export default UserInfoForm
