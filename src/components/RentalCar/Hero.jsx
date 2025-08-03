import React, { useEffect } from 'react'
import { MapPin, Calendar, Clock, Search } from 'lucide-react'
import ScrollReveal from 'scrollreveal'

const Hero = () => {
  useEffect(() => {
    ScrollReveal().reveal('.hero-reveal', {
      distance: '50px',
      duration: 1000,
      easing: 'ease-in-out',
      origin: 'left',
      reset: false,
    })
  }, [])

  useEffect(() => {
    ScrollReveal().reveal('.head-reveal', {
      scale: 0.85,
      distance: '0px',
      duration: 1500,
      easing: 'ease-in-out',
      reset: false,
    })
  }, [])

  useEffect(() => {
    ScrollReveal().reveal('.reveal-y', {
      origin: 'bottom',
      distance: '100px',
      duration: 1500,
      interval: 200,
      easing: 'ease-in-out',
      reset: false,
    })
  }, [])

  return (
    <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white sm:py-28 py-16 px-4 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4 hero-reveal">
        Tìm <span className="text-yellow-400">Xe Thuê Hoàn Hảo</span> Cho Bạn
      </h1>
      <p className="text-lg sm:text-xl mb-12 text-gray-200 hero-reveal">
        Khám phá những ưu đãi tuyệt vời cho các dòng xe chất lượng. Đặt xe ngay và tận hưởng hành trình an toàn.
      </p>

      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-5 gap-4 items-end text-black hero-reveal">
        {/* Địa điểm nhận xe */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <MapPin className="w-5 h-5" /> <span>Địa điểm nhận xe</span>
          </label>
          <select className="w-full p-2 border border-gray-300 rounded cursor-pointer">
            <option>Chọn thành phố</option>
            <option>Hà Nội</option>
            <option>Đà Nẵng</option>
            <option>TP. Hồ Chí Minh</option>
          </select>
        </div>

        {/* Ngày nhận xe */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-5 h-5" /> <span>Ngày nhận xe</span>
          </label>
          <input type="date" className="w-full p-2 border border-gray-300 rounded cursor-pointer" />
        </div>

        {/* Giờ nhận xe */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Clock className="w-5 h-5" /> <span>Giờ nhận xe</span>
          </label>
          <input type="time" className="w-full p-2 border border-gray-300 rounded cursor-pointer" />
        </div>

        {/* Ngày trả xe */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
            <Calendar className="w-5 h-5" /> <span>Ngày trả xe</span>
          </label>
          <input type="date" className="w-full p-2 border border-gray-300 rounded" />
        </div>

        {/* Nút tìm kiếm */}
        <div>
          <button className="flex items-center justify-center gap-2 w-full cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300">
            <Search className="w-5 h-5" /> <span>Tìm xe</span>
          </button>
        </div>
      </div>

      {/* Thống kê */}
      <div className="mt-16 max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-white hero-reveal">
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold">500+</h2>
          <p className="sm:text-lg text-gray-200">Xe cao cấp</p>
        </div>
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold">50+</h2>
          <p className="sm:text-lg text-gray-200">Địa điểm</p>
        </div>
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold">24/7</h2>
          <p className="sm:text-lg text-gray-200">Hỗ trợ</p>
        </div>
        <div>
          <h2 className="sm:text-4xl text-3xl font-bold">99%</h2>
          <p className="sm:text-lg text-gray-200">Khách hài lòng</p>
        </div>
      </div>
    </section>
  )
}

export default Hero
