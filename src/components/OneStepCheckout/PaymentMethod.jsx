import React, { useEffect, useState } from 'react'
import { getPaymentMethods } from '../../api/payment_method'

const PaymentMethod = ({ selectedMethod, setSelectedMethod }) => {
    const [methods, setMethods] = useState([])

    useEffect(() => {
        const fetchMethods = async () => {
            try {
                const res = await getPaymentMethods()
                if (res.status === 'success') {
                    setMethods(res.data)
                }
            } catch (err) {
                console.error('Lỗi khi tải phương thức thanh toán:', err)
            }
        }

        fetchMethods()
    }, [])

    return (
        <div className="mt-8 rounded-2xl border bg-white p-6 shadow">
            <label className="mb-2 block font-semibold text-gray-700">Phương thức thanh toán</label>
            <div className="mt-2 space-y-2">
                {methods.map(({ name, disabled }) => (
                    <label
                        key={name}
                        className={`flex items-center gap-3 ${
                            disabled ? 'text-gray-400' : 'text-gray-700'
                        }`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={name}
                            disabled={disabled}
                            checked={selectedMethod === name}
                            onChange={(e) => setSelectedMethod(e.target.value)}
                        />
                        {name} {disabled && <span className="text-sm text-red-500">(Bảo trì)</span>}
                    </label>
                ))}
            </div>
        </div>
    )
}

export default PaymentMethod
