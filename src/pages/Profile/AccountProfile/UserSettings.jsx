import React, { useState, useEffect } from 'react'

const initialUser = {
    id: 'u123',
    firstName: 'Nguyễn',
    lastName: 'Văn A',
    email: 'nguyenvana@gmail.com',
    phone: '0987654321',
    gender: 'male',
    birthday: {
        day: 15,
        month: 7,
        year: 1995,
    },
    avatar: 'https://i.pravatar.cc/150?img=5',
}

const UserSettings = () => {
    const [user, setUser] = useState(initialUser)

    const handleChange = (field, value) => {
        setUser({ ...user, [field]: value })
    }

    const handleBirthdayChange = (field, value) => {
        setUser({
            ...user,
            birthday: {
                ...user.birthday,
                [field]: parseInt(value),
            },
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Dữ liệu cập nhật:', user)
        alert('Cập nhật thông tin thành công (giả lập)')
    }

    return (
        <div className="mx-auto mt-8 max-w-4xl rounded-md bg-white px-6 py-8 shadow">
            <h2 className="mb-6 text-3xl font-bold text-gray-800">Cài đặt tài khoản</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Avatar */}
                <div className="flex flex-col items-center">
                    <img
                        src={user.avatar}
                        alt="Avatar"
                        className="mb-2 h-28 w-28 rounded-full object-cover"
                    />
                    <input
                        type="file"
                        className="text-sm text-gray-600"
                        onChange={(e) => {
                            const file = e.target.files[0]
                            if (file) {
                                const url = URL.createObjectURL(file)
                                setUser({ ...user, avatar: url })
                            }
                        }}
                    />
                </div>

                {/* Name, Email */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block font-medium">Họ</label>
                        <input
                            type="text"
                            value={user.lastName}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">Tên</label>
                        <input
                            type="text"
                            value={user.firstName}
                            onChange={(e) => handleChange('firstName', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-1 block font-medium">Email</label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="w-full rounded border border-gray-300 px-3 py-2"
                        required
                    />
                </div>

                {/* Phone + Gender */}
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-1 block font-medium">Số điện thoại</label>
                        <input
                            type="text"
                            value={user.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block font-medium">Giới tính</label>
                        <select
                            value={user.gender}
                            onChange={(e) => handleChange('gender', e.target.value)}
                            className="w-full rounded border border-gray-300 px-3 py-2"
                        >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                        </select>
                    </div>
                </div>

                {/* Birthday */}
                <div>
                    <label className="mb-1 block font-medium">Ngày sinh</label>
                    <div className="grid grid-cols-3 gap-2">
                        <select
                            value={user.birthday.day}
                            onChange={(e) => handleBirthdayChange('day', e.target.value)}
                            className="rounded border border-gray-300 px-3 py-2"
                        >
                            {[...Array(31)].map((_, i) => (
                                <option key={i + 1}>{i + 1}</option>
                            ))}
                        </select>
                        <select
                            value={user.birthday.month}
                            onChange={(e) => handleBirthdayChange('month', e.target.value)}
                            className="rounded border border-gray-300 px-3 py-2"
                        >
                            {[...Array(12)].map((_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    Tháng {i + 1}
                                </option>
                            ))}
                        </select>
                        <select
                            value={user.birthday.year}
                            onChange={(e) => handleBirthdayChange('year', e.target.value)}
                            className="rounded border border-gray-300 px-3 py-2"
                        >
                            {[...Array(100)].map((_, i) => {
                                const year = new Date().getFullYear() - i
                                return (
                                    <option key={year} value={year}>
                                        {year}
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
                        className="rounded bg-blue-600 px-6 py-2 text-white shadow hover:bg-blue-700"
                    >
                        Lưu thay đổi
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UserSettings
