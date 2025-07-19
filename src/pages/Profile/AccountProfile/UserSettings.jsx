import React, { useState, useEffect } from 'react'
import locationData from '../../../api/data/old_country/country.json'
import { reverseGeocode } from '../../../api/locationApi'
import AddressForm from '../../../components/OneStepCheckout/UserInfoForm/AddressForm'
import { updateUserInfo } from '../../../api/index'
import { uploadAvatar } from '../../../api/upload'
import axios from 'axios'

const isLeapYear = (year) => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
const getDaysInMonth = (month, year) => {
    if (month === 2) return isLeapYear(year) ? 29 : 28
    if ([4, 6, 9, 11].includes(month)) return 30
    return 31
}

const parseBirthday = (dob) => {
    const [day, month, year] = dob.split('/').map(Number)
    return { day, month, year }
}

const formatBirthday = ({ day, month, year }) => {
    const d = day.toString().padStart(2, '0')
    const m = month.toString().padStart(2, '0')
    return `${d}/${m}/${year}`
}

const UserSettings = () => {
    const [user, setUser] = useState(null)
    const [useGPS, setUseGPS] = useState(false)
    const [isUploading, setIsUploading] = useState(false)

    const [provinces, setProvinces] = useState([])
    const [districts, setDistricts] = useState([])
    const [wards, setWards] = useState([])

    const [selectedProvince, setSelectedProvince] = useState('')
    const [selectedDistrict, setSelectedDistrict] = useState('')
    const [selectedWard, setSelectedWard] = useState('')
    const [street, setStreet] = useState('')
    const [address, setAddress] = useState('')

    useEffect(() => {
        if (Array.isArray(locationData)) setProvinces(locationData)
    }, [])

    useEffect(() => {
        const stored = localStorage.getItem('userData')
        if (stored) {
            try {
                const parsed = JSON.parse(stored)
                const birthday = parseBirthday(parsed.dateOfBirth || '01/01/2000')

                setUser({
                    id: parsed._id,
                    name: parsed.name || '',
                    email: parsed.email || '',
                    avatar: parsed.avatar || '',
                    phone: parsed.mobile || '',
                    gender: parsed.gender || 'other',
                    birthday,
                })
                setStreet('')
                setAddress(parsed.address || '')
            } catch (err) {
                console.error('Lỗi khi parse userData:', err)
            }
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
            const full = `${street}, ${wardName}${districtName ? ', ' + districtName : ''}, ${provinceName}`
            setAddress(full)
        }
    }, [street, selectedProvince, selectedDistrict, selectedWard, useGPS])

    const handleGetCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert('Trình duyệt không hỗ trợ định vị GPS')
            return
        }

        setStreet('')
        setSelectedProvince('')
        setSelectedDistrict('')
        setSelectedWard('')
        setUseGPS(true)

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords
                try {
                    const {
                        street: road,
                        province,
                        ward,
                    } = await reverseGeocode(latitude, longitude)
                    setStreet(road)
                    setSelectedProvince(province)
                    setSelectedWard(ward)
                    setSelectedDistrict('')
                } catch (error) {
                    alert('Không thể lấy địa chỉ hiện tại')
                }
            },
            (err) => {
                console.error(err)
                alert('Vui lòng bật GPS hoặc cho phép truy cập vị trí')
            }
        )
    }

    const handleChange = (field, value) => {
        setUser((prev) => ({ ...prev, [field]: value }))
    }

    const handleBirthdayChange = (field, value) => {
        const newBirthday = { ...user.birthday, [field]: parseInt(value) }
        const maxDays = getDaysInMonth(newBirthday.month, newBirthday.year)
        if (newBirthday.day > maxDays) newBirthday.day = maxDays
        setUser({ ...user, birthday: newBirthday })
    }

    const handleAvatarUpload = async (file) => {
        try {
            setIsUploading(true)
            const { url } = await uploadAvatar(file)
            setUser((prev) => ({ ...prev, avatar: url }))
        } catch (err) {
            alert('Lỗi tải ảnh lên Cloudinary')
            console.error(err)
        } finally {
            setIsUploading(false)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const payload = {
                name: user.name,
                mobile: user.phone,
                gender: user.gender,
                dateOfBirth: formatBirthday(user.birthday),
                address,
                avatar: user.avatar,
            }

            const res = await updateUserInfo(payload)
            if (res.data.success) {
                alert('Cập nhật thành công!')
                localStorage.setItem(
                    'userData',
                    JSON.stringify({ ...user, address, dateOfBirth: payload.dateOfBirth })
                )
            }
        } catch (err) {
            console.error('Lỗi cập nhật:', err)
            alert('Cập nhật thất bại.')
        }
    }

    if (!user) return <p>Đang tải thông tin người dùng...</p>

    const { day, month, year } = user.birthday
    const daysInSelectedMonth = getDaysInMonth(month, year)

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold">Cài đặt tài khoản</h2>

            {/* Avatar */}
            <div className="flex flex-col items-center">
                <img
                    src={user.avatar}
                    alt="avatar"
                    className="h-28 w-28 rounded-full object-cover"
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files[0]
                        if (file) handleAvatarUpload(file)
                    }}
                    className="text-sm"
                />
                {isUploading && <p className="text-sm text-gray-500">Đang tải ảnh...</p>}
            </div>

            {/* Họ tên + Email */}
            <div>
                <label>Họ và tên</label>
                <input
                    type="text"
                    value={user.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full rounded border px-3 py-2"
                />
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full rounded border bg-gray-100 px-3 py-2"
                />
            </div>

            {/* Phone + Gender */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <label>Số điện thoại</label>
                    <input
                        type="text"
                        value={user.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    />
                </div>
                <div>
                    <label>Giới tính</label>
                    <select
                        value={user.gender}
                        onChange={(e) => handleChange('gender', e.target.value)}
                        className="w-full rounded border px-3 py-2"
                    >
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                    </select>
                </div>
            </div>

            {/* AddressForm */}
            <AddressForm
                useGPS={useGPS}
                setUseGPS={setUseGPS}
                provinces={provinces}
                districts={districts}
                wards={wards}
                selectedProvince={selectedProvince}
                setSelectedProvince={setSelectedProvince}
                selectedDistrict={selectedDistrict}
                setSelectedDistrict={setSelectedDistrict}
                selectedWard={selectedWard}
                setSelectedWard={setSelectedWard}
                street={street}
                setStreet={setStreet}
                handleGetCurrentLocation={handleGetCurrentLocation}
                label="Địa chỉ thường trú"
                fullAdd={address}
            />

            {/* Birthday */}
            <div>
                <label>Ngày sinh</label>
                <div className="grid grid-cols-3 gap-2">
                    <select
                        value={day}
                        onChange={(e) => handleBirthdayChange('day', e.target.value)}
                        className="rounded border px-3 py-2"
                    >
                        {[...Array(daysInSelectedMonth)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                    <select
                        value={month}
                        onChange={(e) => handleBirthdayChange('month', e.target.value)}
                        className="rounded border px-3 py-2"
                    >
                        {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={i + 1}>
                                Tháng {i + 1}
                            </option>
                        ))}
                    </select>
                    <select
                        value={year}
                        onChange={(e) => handleBirthdayChange('year', e.target.value)}
                        className="rounded border px-3 py-2"
                    >
                        {[...Array(100)].map((_, i) => {
                            const y = new Date().getFullYear() - i
                            return (
                                <option key={y} value={y}>
                                    {y}
                                </option>
                            )
                        })}
                    </select>
                </div>
            </div>

            {/* Submit */}
            <div className="text-center">
                <button
                    type="submit"
                    className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                >
                    Lưu thay đổi
                </button>
            </div>
        </form>
    )
}

export default UserSettings
