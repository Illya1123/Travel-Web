import React from 'react'

const PaymentMethod = ({ selectedMethod, setSelectedMethod }) => {
    const methods = [
        { name: 'MoMo', disabled: false },
        { name: 'VNPay', disabled: true },
        { name: 'ZaloPay', disabled: true },
        { name: 'Tiền Mặt', disabled: false },
    ]

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
