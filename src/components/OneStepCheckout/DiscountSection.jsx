import React from 'react'

const DiscountSection = ({ discountCode, setDiscountCode, applyDiscount }) => {
    return (
        <div className="mt-10 rounded-2xl border bg-white p-6 shadow">
            <label className="mb-2 block font-semibold text-gray-700">Mã khuyến mãi</label>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
                <div className="flex-1">
                    <input
                        className="w-full rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder="Nhập mã khuyến mãi"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Ví dụ: <span className="font-medium text-gray-600">SUMMER2025</span> hoặc{' '}
                        <span className="font-medium text-gray-600">GIAMGIA50</span>
                    </p>
                </div>
                <button
                    onClick={applyDiscount}
                    className="mt-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 sm:mt-0"
                >
                    Áp dụng
                </button>
            </div>
        </div>
    )
}

export default DiscountSection
