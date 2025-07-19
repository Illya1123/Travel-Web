import React from 'react'

const ConfirmModal = ({ handlePayment, setShowConfirm }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-fade-in w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Xác nhận thanh toán</h2>
                <p className="mb-6 text-gray-600">Bạn có chắc chắn muốn đặt tour này?</p>
                <div className="flex justify-end gap-4">
                    <button
                        className="rounded-lg bg-gray-300 px-5 py-2 transition hover:bg-gray-400"
                        onClick={() => setShowConfirm(false)}
                    >
                        Huỷ
                    </button>
                    <button
                        className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
                        onClick={handlePayment}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
