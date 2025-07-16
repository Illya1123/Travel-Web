import React from 'react'
import './home.css'
import video from '../../Assets/home_video.mp4'
import { GrLocation } from 'react-icons/gr'
import { HiFilter } from 'react-icons/hi'
import { FiFacebook } from 'react-icons/fi'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTripadvisor, FaArrowUp } from 'react-icons/fa'
import { BsListTask } from 'react-icons/bs'
import { TbApps } from 'react-icons/tb'
import Main from '../../components/Main/Main.jsx'

const Home = () => {
    const [showScroll, setShowScroll] = React.useState(false)
    const [searchKeyword, setSearchKeyword] = React.useState('')
    const [price, setPrice] = React.useState(100000000)

    // Format giá tiền theo VND
    const formatCurrency = (value) => {
        return value.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
        })
    }

    React.useEffect(() => {
        const handleScroll = () => {
            setShowScroll(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            <section className="home">
                <div className="overlay"></div>
                <video src={video} typeof="video/mp4" loop autoPlay muted></video>
                <div className="homeContent container">
                    <div className="textDiv text-center text-white mb-10">
                        <span className="smallText block text-sm uppercase tracking-wide mb-2">Xách balo mà đi</span>
                        <h1 className="homeTitle text-3xl md:text-5xl font-bold">Đi thật xa để trở về</h1>
                    </div>

                    <div className="cardDiv grid">
                        <div className="destinationInput">
                            <label htmlFor="city">Tìm điểm đến:</label>
                            <div className="input flex">
                                <input
                                    type="text"
                                    placeholder="Nhập tên địa danh vào đây..."
                                    value={searchKeyword}
                                    onChange={(e) => setSearchKeyword(e.target.value)}
                                />
                                <GrLocation className="icon" />
                            </div>
                        </div>

                        <div className="dateInput">
                            <label htmlFor="date">Chọn ngày:</label>
                            <div className="input flex">
                                <input type="date" />
                            </div>
                        </div>

                        <div className="priceInput">
                            <div className="label_total flex">
                                <label htmlFor="price">Khoảng giá tối đa:</label>
                                <h3 className="total">{formatCurrency(price)}</h3>
                            </div>
                            <div className="input flex">
                                <input
                                    type="range"
                                    min="1000000"
                                    max="100000000"
                                    step="500000"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="searchOptions flex">
                            <HiFilter className="icon" />
                            <span>MORE FILTERS</span>
                        </div>
                    </div>

                    <div className="homeFooterIcons flex">
                        <div className="rightIcons">
                            <FiFacebook className="icon" />
                            <AiOutlineInstagram className="icon" />
                            <FaTripadvisor className="icon" />
                        </div>

                        <div className="leftIcons">
                            <BsListTask className="icon" />
                            <TbApps className="icon" />
                        </div>
                    </div>
                </div>
            </section>
            <Main searchKeyword={searchKeyword} maxPrice={price}/>
            {showScroll && (
                <button className="scrollToTop" onClick={scrollToTop}>
                    <FaArrowUp />
                </button>
            )}
        </>
    )
}

export default Home
