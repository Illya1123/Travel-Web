import React from 'react'

const Loading = () => {
    const text = 'Đang tải dữ liệu...'

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-white">
            <img
                src="https://res.cloudinary.com/dnroxsd4n/image/upload/v1753205512/lp-content-cat_fcjswx.gif"
                alt="Loading..."
                className="w-60 h-60 object-contain"
                loading="lazy"
                decoding="async"
            />
            <div className="mt-4 flex space-x-[2px]">
                {text.split('').map((char, index) => (
                    <span
                        key={index}
                        className="text-gray-700 text-lg font-medium inline-block animate-wave"
                        style={{
                            animationDelay: `${index * 0.05}s`,
                        }}
                    >
                        {char}
                    </span>
                ))}
            </div>
        </div>
    )
}

export default Loading
