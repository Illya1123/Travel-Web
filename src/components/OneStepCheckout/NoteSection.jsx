import React from 'react'

const NoteSection = ({ note, setNote }) => {
    return (
        <div className="mt-10 rounded-2xl border bg-white p-6 shadow">
            <label className="mb-2 block font-semibold text-gray-700">Ghi chú</label>
            <textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Nhập ghi chú (ví dụ: ăn chay, cần hỗ trợ thêm...)"
                className="w-full resize-none rounded-lg border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
        </div>
    )
}

export default NoteSection
