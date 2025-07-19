import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'

const AddressForm = ({
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
    label = 'Địa chỉ đón đầy đủ',
    fullAdd,
}) => {
    const fullAddress =
        street && selectedWard && selectedProvince
            ? `${street}, ${
                  useGPS ? selectedWard : wards.find((w) => w.code === +selectedWard)?.name || ''
              }${
                  useGPS
                      ? ''
                      : selectedDistrict
                        ? ', ' + (districts.find((d) => d.code === +selectedDistrict)?.name || '')
                        : ''
              }, ${
                  useGPS
                      ? selectedProvince
                      : provinces.find((p) => p.code === +selectedProvince)?.name || ''
              }`
            : ''

    return (
        <div className="relative mb-4">
            <div className="mb-2 flex items-center justify-between">
                <label className="flex-1 font-semibold text-gray-700">Địa chỉ</label>
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleGetCurrentLocation}
                        className="flex items-center text-sm text-blue-500 hover:underline"
                    >
                        <FaMapMarkerAlt className="mr-1" />
                        {useGPS ? 'Lấy lại vị trí GPS' : 'Dùng định vị GPS'}
                    </button>
                    {useGPS && (
                        <button
                            onClick={() => {
                                setUseGPS(false)
                                setStreet('')
                            }}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            Chọn thủ công
                        </button>
                    )}
                </div>
            </div>

            <div className="space-y-3">
                {useGPS ? (
                    <>
                        <input
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            placeholder="Tỉnh/Thành phố"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                            placeholder="Phường/Xã"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="Tên đường, số nhà..."
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </>
                ) : (
                    <>
                        <select
                            value={selectedProvince}
                            onChange={(e) => setSelectedProvince(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn Tỉnh/Thành phố</option>
                            {provinces.map((province) => (
                                <option key={province.code} value={province.code}>
                                    {province.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedDistrict}
                            onChange={(e) => setSelectedDistrict(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!districts.length}
                        >
                            <option value="">Chọn Quận/Huyện</option>
                            {districts.map((district) => (
                                <option key={district.code} value={district.code}>
                                    {district.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={selectedWard}
                            onChange={(e) => setSelectedWard(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!wards.length}
                        >
                            <option value="">Chọn Phường/Xã</option>
                            {wards.map((ward) => (
                                <option key={ward.code} value={ward.code}>
                                    {ward.name}
                                </option>
                            ))}
                        </select>

                        <input
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
                            placeholder="Tên đường, số nhà..."
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </>
                )}

                <div className="mt-4">
                    <label className="mb-1 block font-semibold text-gray-700">{label}</label>
                    <input
                        value={fullAddress}
                        readOnly
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 px-4 py-3 text-gray-800 outline-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default AddressForm
