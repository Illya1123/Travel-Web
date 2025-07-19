import React from 'react'

const ReadonlyInput = ({ icon: Icon, value, placeholder }) => (
    <div className="relative mb-4">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
            value={value}
            placeholder={placeholder}
            readOnly
            className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 pl-11 pr-4 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
        />
    </div>
)

export default ReadonlyInput
