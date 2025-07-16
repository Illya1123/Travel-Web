import {
    HiOutlineLocationMarker,
    HiOutlineShoppingCart,
    HiOutlineTrash,
    HiOutlineCalendar,
    HiPhoneOutgoing,
} from 'react-icons/hi'

export const TouristCard = ({ item, type }) => {
    return (
        <div
            onClick={() => {
                console.log('Go to detail')
            }}
            className="group my-3 rounded-lg bg-[#e1e1eb] shadow-custom transition-all duration-300 ease-in-out hover:bg-white"
        >
            <div key={item.id} className="my-4 flex items-center rounded-lg p-4">
                <div className="h-full w-1/3">
                    <img
                        src={item.imgSrc}
                        alt={item.destTitle}
                        className="h-[250px] w-full rounded-lg object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 lg:h-[300px]"
                    />
                </div>
                <div className="w-2/3 pl-6">
                    <h3 className="text-2xl font-semibold">{item.destTitle}</h3>
                    <div className="mt-1 flex flex-wrap items-center gap-3">
                        <p className="text-md flex items-center text-gray-500">
                            <HiOutlineLocationMarker className="mr-2" />
                            {item.location}
                        </p>
                        <p className="flex items-center text-sm text-gray-500">
                            <HiOutlineCalendar className="mr-2" />
                            {item.startDate} - {item.endDate}
                        </p>
                    </div>
                    <hr className="mt-2" />
                    <div className="flex h-[50px] flex-wrap items-center">
                        <p className="text-md hidden font-semibold text-gray-500 md:block">
                            {item.grade}
                        </p>
                        <p className="ml-3 text-[35px] text-green-500">{item.fees}</p>
                    </div>
                    <hr className="mt-2" />
                    <p className="mt-3 hidden text-sm text-gray-600 lg:block">{item.description}</p>
                    <div className="mt-3 flex flex-wrap justify-between">
                        <div className="flex flex-wrap gap-2">
                            {type === 'Cart-On-Process' && (
                                <button className="flex flex-wrap items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                    <HiPhoneOutgoing />
                                    <p className="hidden lg:block">Phản hồi</p>
                                </button>
                            )}
                            {type === 'Favourite' && (
                                <button className="flex flex-wrap items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                                    <HiOutlineShoppingCart></HiOutlineShoppingCart>
                                    <p className="hidden lg:block">Đặt tour</p>
                                </button>
                            )}
                            <button className="flex flex-wrap items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                                <HiOutlineTrash></HiOutlineTrash>
                                <p className="hidden lg:block">Hủy tour</p>
                            </button>
                        </div>
                        <button
                            onClick={() => {
                                console.log(`Nhấn hướng dẫn viên: ${item.tourGuide}`)
                            }}
                            className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                        >
                            <img
                                src={item.avatar}
                                alt="Ảnh đại diện của hướng dẫn viên"
                                className="h-[70px] w-[75px] rounded-full"
                            />
                            <p className="italic text-black">{item.tourGuide}</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
