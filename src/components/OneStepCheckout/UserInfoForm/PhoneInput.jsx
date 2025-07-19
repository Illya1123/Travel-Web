import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'

const PhoneInput = ({ value, onChange, error }) => (
    <div className="relative mb-4">
        <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
            value={value}
            onChange={onChange}
            placeholder="Số điện thoại"
            className={`w-full rounded-lg border py-3 pl-11 pr-4 placeholder-gray-400 outline-none ${
                error
                    ? 'border-red-500 ring-red-400 focus:ring-2'
                    : 'border-gray-300 bg-gray-100 focus:ring-2 focus:ring-blue-500'
            }`}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
)

export default PhoneInput
