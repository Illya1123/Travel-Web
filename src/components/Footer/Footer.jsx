import React from 'react'
import './footer.css'
import { FiSend } from 'react-icons/fi'
import { MdOutlineTravelExplore } from 'react-icons/md'
import { AiOutlineTwitter } from 'react-icons/ai'
import { AiFillYoutube } from 'react-icons/ai'
import { AiFillInstagram } from 'react-icons/ai'
import { FaTripadvisor } from 'react-icons/fa'
import { FiChevronRight } from 'react-icons/fi'

const Footer = () => {
    return (
        <div className="footer">
            <div className="videoDiv">
                <video
                    src="/videos/footer_video.mp4"
                    preload="auto"
                    playsInline
                    loop
                    autoPlay
                    muted
                    type="video/mp4"
                ></video>
            </div>

            <div className="secContent container z-10">
                <div className="contactDiv flex">
                    <div className="text text-center">
                        <small className="text mt-4 block">CHÀO MỪNG QUÝ KHÁCH</small>
                        <h2 className="text text-2xl font-semibold">Đồng hành cùng chúng tôi</h2>
                    </div>

                    <div className="inputDiv flex">
                        <input type="text" placeholder="Nhập Email" />
                        <button className="btn flex" type="submit">
                            GỬI
                            <FiSend className="icon" />
                        </button>
                    </div>
                </div>

                <div className="footerCard flex">
                    <div className="footerIntro flex">
                        <div className="logoDiv">
                            <a href="#" className="logo flex">
                                <MdOutlineTravelExplore className="icon" />
                                Travel
                            </a>
                        </div>

                        <div className="footerParagraph">
                            Travel - Cánh cửa mở ra thế giới kỳ diệu. Với giao diện trực quan, thân
                            thiện, bạn dễ dàng tìm kiếm và đặt vé máy bay, khách sạn, tour du lịch
                            chỉ với vài cú click chuột. Hệ thống so sánh giá thông minh giúp bạn tìm
                            được những ưu đãi hấp dẫn nhất. Đặc biệt, đội ngũ hỗ trợ khách hàng 24/7
                            luôn sẵn sàng giải đáp mọi thắc mắc, đảm bảo chuyến đi của bạn luôn suôn
                            sẻ và trọn vẹn.
                        </div>

                        <div className="footerSocials flex">
                            <AiOutlineTwitter className="icon" />
                            <AiFillYoutube className="icon" />
                            <AiFillInstagram className="icon" />
                            <FaTripadvisor className="icon" />
                        </div>
                    </div>

                    <div className="footerLinks grid">
                        <div className="linkGroup">
                            <span className="groupTitle">VỀ TRAVEL</span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Các dịch vụ
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Bảo hiểm
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Hãng hàng
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Du lịch
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Chi phí
                            </li>
                        </div>

                        <div className="linkGroup">
                            <span className="groupTitle">CÁC ĐỐI TÁC</span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Bookings
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                RentCars
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                HostelWorld
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Traveloka
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                TripAdvisor
                            </li>
                        </div>

                        <div className="linkGroup">
                            <span className="groupTitle">MỚI NHẤT</span>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Đà Lạt
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Bến Tre
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Thủ đô Hà Nội
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Vũng Tàu
                            </li>

                            <li className="footerList flex">
                                <FiChevronRight className="icon" />
                                Mũi Né
                            </li>
                        </div>
                    </div>

                    <div className="footerDiv flex text-center">
                        <small>TRANG WEB TRAVEL WITH QUOC ANH</small>
                        <small>COPYRIGHTS RESERVED - Illya Chan</small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
