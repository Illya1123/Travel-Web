// api/Staff.js
import axios from 'axios'
import { baseUrl } from './index'

const getAllTours = async () => {
    try {
        const response = await axios.get(`${baseUrl}/tours/getAll`)
        return response.data
    } catch (error) {
        console.error('Fetch failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const getAllTickets = async () => {
    try {
        const response = await axios.get(`${baseUrl}/bookings/getAll`)
        return response.data
    } catch (error) {
        console.error('Fetch failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

const getAllCustomers = async () => {
    try {
        const response = await axios.get(`${baseUrl}/users/getUser/1`)
        return response.data
    } catch (error) {
        console.error('Fetch failed:', error.response ? error.response.data : error.message)
        throw error
    }
}

export { getAllTours, getAllTickets, getAllCustomers }

// export const toursData = [
//   {
//     id: 1,
//     column1: "HCM-VT",
//     column2: "Hồ Chí Minh - Vũng Tàu",
//     column3: "01/12/2024 - 05/12/2024",
//     column4: "10/50",
//     column5: "$2000",
//     column6: "Chờ đặt vé",
//   },
//   {
//     id: 2,
//     column1: "HCM-BD",
//     column2: "Hồ Chí Minh - Bình Dương",
//     column3: "28/11/2024 - 07/12/2024",
//     column4: "30/60",
//     column5: "$1500",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 3,
//     column1: "HCM-NT",
//     column2: "Hồ Chí Minh - Nha Trang",
//     column3: "03/12/2024 - 10/12/2024",
//     column4: "70/100",
//     column5: "$5000",
//     column6: "Chờ đặt vé",
//   },
//   {
//     id: 4,
//     column1: "HCM-DL",
//     column2: "Hồ Chí Minh - Đà Lạt",
//     column3: "12/11/2024 - 18/11/2024",
//     column4: "42/60",
//     column5: "$2500",
//     column6: "Kết thúc",
//   },
//   {
//     id: 5,
//     column1: "HCM-VHL",
//     column2: "Hồ Chí Minh - Vịnh Hạ Long",
//     column3: "23/11/2024 - 04/12/2024",
//     column4: "30/30",
//     column5: "$6100",
//     column6: "Đầy chỗ",
//   },
//   {
//     id: 6,
//     column1: "HCM-HN",
//     column2: "Hồ Chí Minh - Hà Nội",
//     column3: "05/10/2024 - 07/11/2024",
//     column4: "55/70",
//     column5: "$7800",
//     column6: "Kết thúc",
//   },
//   {
//     id: 7,
//     column1: "HCM-CM",
//     column2: "Hồ Chí Minh - Cà Mau",
//     column3: "18/11/2024 - 20/11/2024",
//     column4: "30/45",
//     column5: "$3200",
//     column6: "Kết thúc",
//   },
//   {
//     id: 8,
//     column1: "HCM-HP",
//     column2: "Hồ Chí Minh - Hải Phòng",
//     column3: "20/12/2024 - 25/12/2024",
//     column4: "80/80",
//     column5: "$4900",
//     column6: "Đầy chỗ",
//   },
//   {
//     id: 9,
//     column1: "HCM-DN",
//     column2: "Hồ Chí Minh - Đà Nẵng",
//     column3: "01/12/2024 - 10/12/2024",
//     column4: "60/70",
//     column5: "$4500",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 10,
//     column1: "HCM-PY",
//     column2: "Hồ Chí Minh - Phú Yên",
//     column3: "10/11/2024 - 15/11/2024",
//     column4: "25/40",
//     column5: "$3100",
//     column6: "Kết thúc",
//   },
//   {
//     id: 11,
//     column1: "HCM-QN",
//     column2: "Hồ Chí Minh - Quảng Ninh",
//     column3: "05/12/2024 - 15/12/2024",
//     column4: "50/50",
//     column5: "$6800",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 12,
//     column1: "HCM-HG",
//     column2: "Hồ Chí Minh - Hà Giang",
//     column3: "30/11/2024 - 08/12/2024",
//     column4: "20/25",
//     column5: "$7800",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 13,
//     column1: "HCM-CT",
//     column2: "Hồ Chí Minh - Cần Thơ",
//     column3: "15/12/2024 - 20/12/2024",
//     column4: "45/50",
//     column5: "$2200",
//     column6: "Chờ đặt vé",
//   },
//   {
//     id: 14,
//     column1: "HCM-BR",
//     column2: "Hồ Chí Minh - Bà Rịa",
//     column3: "11/11/2024 - 14/11/2024",
//     column4: "35/40",
//     column5: "$2800",
//     column6: "Kết thúc",
//   },
//   {
//     id: 15,
//     column1: "HCM-KG",
//     column2: "Hồ Chí Minh - Kiên Giang",
//     column3: "17/12/2024 - 23/12/2024",
//     column4: "30/60",
//     column5: "$4300",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 16,
//     column1: "HCM-LD",
//     column2: "Hồ Chí Minh - Lâm Đồng",
//     column3: "22/12/2024 - 29/12/2024",
//     column4: "55/55",
//     column5: "$5600",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 17,
//     column1: "HCM-DK",
//     column2: "Hồ Chí Minh - Đắk Lắk",
//     column3: "04/12/2024 - 09/12/2024",
//     column4: "45/45",
//     column5: "$3200",
//     column6: "Đầy chỗ",
//   },
//   {
//     id: 18,
//     column1: "HCM-ST",
//     column2: "Hồ Chí Minh - Sóc Trăng",
//     column3: "01/10/2024 - 07/10/2024",
//     column4: "30/30",
//     column5: "$2000",
//     column6: "Kết thúc",
//   },
//   {
//     id: 19,
//     column1: "HCM-AG",
//     column2: "Hồ Chí Minh - An Giang",
//     column3: "01/12/2024 - 06/12/2024",
//     column4: "15/50",
//     column5: "$2600",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 20,
//     column1: "HCM-TV",
//     column2: "Hồ Chí Minh - Trà Vinh",
//     column3: "30/09/2024 - 05/10/2024",
//     column4: "18/25",
//     column5: "$2900",
//     column6: "Kết thúc",
//   },
//   {
//     id: 21,
//     column1: "HCM-TH",
//     column2: "Hồ Chí Minh - Thanh Hóa",
//     column3: "05/12/2024 - 12/12/2024",
//     column4: "70/100",
//     column5: "$5200",
//     column6: "Đang thực hiện",
//   },
//   {
//     id: 22,
//     column1: "HCM-PT",
//     column2: "Hồ Chí Minh - Phan Thiết",
//     column3: "25/11/2024 - 28/11/2024",
//     column4: "22/40",
//     column5: "$1500",
//     column6: "Đầy chỗ",
//   },
//   {
//     id: 23,
//     column1: "HCM-BP",
//     column2: "Hồ Chí Minh - Bình Phước",
//     column3: "12/11/2024 - 16/11/2024",
//     column4: "45/50",
//     column5: "$1800",
//     column6: "Kết thúc",
//   },
//   {
//     id: 24,
//     column1: "HCM-BL",
//     column2: "Hồ Chí Minh - Bạc Liêu",
//     column3: "10/12/2024 - 15/12/2024",
//     column4: "20/30",
//     column5: "$2800",
//     column6: "Đang thực hiện",
//   },
// ];

// export const ticketsData = [
//   {
//     id: 1,
//     column1: "VT011224NVA",
//     column2: "HCM-VT",
//     column3: "Nguyễn Văn A",
//     column4: "4",
//     column5: "28/11/2024 - 08:30:26",
//     column6: "Đã thanh toán (Chuyển khoản)",
//   },
//   {
//     id: 2,
//     column1: "VT011224NVB",
//     column2: "HCM-VT",
//     column3: "Nguyễn Văn B",
//     column4: "1",
//     column5: "26/11/2024 - 18:23:42",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 3,
//     column1: "VT031224NVC",
//     column2: "HCM-NT",
//     column3: "Nguyễn Văn C",
//     column4: "6",
//     column5: "01/12/2024 - 09:30:33",
//     column6: "Chưa thanh toán",
//   },
//   {
//     id: 4,
//     column1: "VT031224NVD",
//     column2: "HCM-NT",
//     column3: "Nguyễn Văn D",
//     column4: "4",
//     column5: "30/11/2024 - 12:12:26",
//     column6: "Hủy vé",
//   },
//   {
//     id: 5,
//     column1: "VT181124NVE",
//     column2: "HCM-CM",
//     column3: "Nguyễn Văn E",
//     column4: "2",
//     column5: "08/11/2024 - 14:28:54",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 6,
//     column1: "VT181124NVF",
//     column2: "HCM-CM",
//     column3: "Nguyễn Văn F",
//     column4: "1",
//     column5: "17/11/2024 - 20:46:26",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 7,
//     column1: "VT121124NVG",
//     column2: "HCM-DL",
//     column3: "Nguyễn Văn G",
//     column4: "4",
//     column5: "11/11/2024 - 18:33:28",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 8,
//     column1: "VT121124NVH",
//     column2: "HCM-DL",
//     column3: "Nguyễn Văn H",
//     column4: "3",
//     column5: "02/11/2024 - 06:57:22",
//     column6: "Hủy vé",
//   },
//   {
//     id: 9,
//     column1: "VT011224NVI",
//     column2: "HCM-AG",
//     column3: "Nguyễn Văn I",
//     column4: "2",
//     column5: "28/11/2024 - 10:30:53",
//     column6: "Chưa thanh toán",
//   },
//   {
//     id: 10,
//     column1: "VT011224NVJ",
//     column2: "HCM-AG",
//     column3: "Nguyễn Văn J",
//     column4: "1",
//     column5: "25/11/2024 - 02:09:05",
//     column6: "Hủy vé",
//   },
//   {
//     id: 11,
//     column1: "VT101224NVK",
//     column2: "HCM-BL",
//     column3: "Nguyễn Văn K",
//     column4: "5",
//     column5: "29/11/2024 - 08:37:12",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 12,
//     column1: "VT101224NVL",
//     column2: "HCM-BL",
//     column3: "Nguyễn Văn L",
//     column4: "1",
//     column5: "08/12/2024 - 19:37:26",
//     column6: "Hủy vé",
//   },
//   {
//     id: 13,
//     column1: "VT201224NVM",
//     column2: "HCM-HP",
//     column3: "Nguyễn Văn M",
//     column4: "4",
//     column5: "12/12/2024 - 19:30:44",
//     column6: "Chưa thanh toán",
//   },
//   {
//     id: 14,
//     column1: "VT201224NVN",
//     column2: "HCM-HP",
//     column3: "Nguyễn Văn N",
//     column4: "2",
//     column5: "18/12/2024 - 13:31:13",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 15,
//     column1: "VT011224NVO",
//     column2: "HCM-VT",
//     column3: "Nguyễn Văn O",
//     column4: "3",
//     column5: "28/11/2024 - 04:03:02",
//     column6: "Đã thanh toán (Chuyển khoản)",
//   },
//   {
//     id: 16,
//     column1: "VT121124NVP",
//     column2: "HCM-DL",
//     column3: "Nguyễn Văn P",
//     column4: "10",
//     column5: "08/11/2024 - 23:42:52",
//     column6: "Đã thanh toán (Chuyển khoản)",
//   },
//   {
//     id: 17,
//     column1: "VT041224NVQ",
//     column2: "HCM-DK",
//     column3: "Nguyễn Văn Q",
//     column4: "8",
//     column5: "02/12/2024 - 15:13:56",
//     column6: "Hủy vé",
//   },
//   {
//     id: 18,
//     column1: "VT041224NVR",
//     column2: "HCM-DK",
//     column3: "Nguyễn Văn R",
//     column4: "4",
//     column5: "25/11/2024 - 22:10:16",
//     column6: "Chưa thanh toán",
//   },
//   {
//     id: 19,
//     column1: "VT171224NVS",
//     column2: "HCM-KG",
//     column3: "Nguyễn Văn S",
//     column4: "7",
//     column5: "08/12/2024 - 01:03:06",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 20,
//     column1: "VT171224NVT",
//     column2: "HCM-KG",
//     column3: "Nguyễn Văn T",
//     column4: "3",
//     column5: "30/11/2024 - 07:30:31",
//     column6: "Hủy vé",
//   },
//   {
//     id: 21,
//     column1: "VT171224NVU",
//     column2: "HCM-KG",
//     column3: "Nguyễn Văn U",
//     column4: "5",
//     column5: "07/12/2024 - 08:30:26",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
//   {
//     id: 22,
//     column1: "VT101224NVV",
//     column2: "HCM-BL",
//     column3: "Nguyễn Văn V",
//     column4: "4",
//     column5: "22/11/2024 - 08:38:58",
//     column6: "Đã thanh toán (Chuyển khoản)",
//   },
//   {
//     id: 23,
//     column1: "VT011224NVW",
//     column2: "HCM-VT",
//     column3: "Nguyễn Văn W",
//     column4: "1",
//     column5: "28/11/2024 - 08:30:26",
//     column6: "Hủy vé",
//   },
//   {
//     id: 24,
//     column1: "VT011224NVX",
//     column2: "HCM-VT",
//     column3: "Nguyễn Văn X",
//     column4: "1",
//     column5: "28/11/2024 - 08:30:26",
//     column6: "Đã thanh toán (Tiền mặt)",
//   },
// ];

// export const customersData = [
//   {
//     id: 1,
//     column1: "Nguyễn Văn A",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "3.7",
//   },
//   {
//     id: 2,
//     column1: "Nguyễn Văn B",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "3.8",
//   },
//   {
//     id: 3,
//     column1: "Nguyễn Văn C",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "3.9",
//   },
//   {
//     id: 4,
//     column1: "Nguyễn Văn D",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.0",
//   },
//   {
//     id: 5,
//     column1: "Nguyễn Văn E",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.1",
//   },
//   {
//     id: 6,
//     column1: "Nguyễn Văn F",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.2",
//   },
//   {
//     id: 7,
//     column1: "Nguyễn Văn G",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.3",
//   },
//   {
//     id: 8,
//     column1: "Nguyễn Văn H",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.4",
//   },
//   {
//     id: 9,
//     column1: "Nguyễn Văn I",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.5",
//   },
//   {
//     id: 10,
//     column1: "Nguyễn Văn J",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.6",
//   },
//   {
//     id: 11,
//     column1: "Nguyễn Văn K",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.7",
//   },
//   {
//     id: 12,
//     column1: "Nguyễn Văn L",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.8",
//   },
//   {
//     id: 13,
//     column1: "Nguyễn Văn M",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "4.9",
//   },
//   {
//     id: 14,
//     column1: "Nguyễn Văn N",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "5.0",
//   },
//   {
//     id: 15,
//     column1: "Nguyễn Văn O",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "2.6",
//   },
//   {
//     id: 16,
//     column1: "Nguyễn Văn P",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "1.3",
//   },
//   {
//     id: 17,
//     column1: "Nguyễn Văn Q",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "1.9",
//   },
//   {
//     id: 18,
//     column1: "Nguyễn Văn R",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "2.1",
//   },
//   {
//     id: 19,
//     column1: "Nguyễn Văn S",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "2.7",
//   },
//   {
//     id: 20,
//     column1: "Nguyễn Văn T",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "2.8",
//   },
//   {
//     id: 21,
//     column1: "Nguyễn Văn U",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "2.9",
//   },
//   {
//     id: 22,
//     column1: "Nguyễn Văn V",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "3.3",
//   },
//   {
//     id: 23,
//     column1: "Nguyễn Văn W",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "3.5",
//   },
//   {
//     id: 24,
//     column1: "Nguyễn Văn X",
//     column2: "0123456789",
//     column3: "Số A, Đường B, Phường C, Quận D",
//     column4: "3.0",
//   },
// ];
