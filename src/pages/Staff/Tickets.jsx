import React, { useEffect, useRef, useState } from 'react'
import ReactPaginate from 'react-paginate'

// Import APIs Here
import { getAllTickets } from '../../api/staff'

// Import Components Here
import Header from '../../components/Header/Header'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'

// Import Icons Here
import PaginationNext from '../../Assets/icons/pagination/next.svg'
import PaginationPrev from '../../Assets/icons/pagination/prev.svg'

const Tickets = () => {
    // Variables here
    // // For tour data and searching
    const [ticketData, setticketData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    // // For table functions
    const headers = [
        'Mã vé',
        'Mã chuyến đi',
        'Tên khách hàng',
        'Số ghế đặt',
        'Thời gian đặt',
        'Tình trạng',
    ] // Table Columns Header
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' }) // Table Columns Header Sorting A-Z and Z-A
    const [selectedRows, setSelectedRows] = useState({}) // Track selected rows
    const [dropdownValue, setDropdownValue] = useState('')
    const [isDropdownDisabled, setIsDropdownDisabled] = useState(true) // State for dropdown
    const [isButtonDisabled, setIsButtonDisabled] = useState(true) // State for update button
    // // For updating header checkbox state dynamically
    const headerCheckboxRef = useRef(null) // Ref for the header checkbox
    const allSelected = ticketData.every((row) => selectedRows[row.id])
    const someSelected = ticketData.some((row) => selectedRows[row.id])
    // // For calculating pagination
    const [currentPage, setCurrentPage] = useState(0) // Current page index
    const [rowsPerPage] = useState(5) // Rows per page
    const offset = currentPage * rowsPerPage
    const paginatedData = filteredData.slice(offset, offset + rowsPerPage)
    const pageCount = Math.ceil(filteredData.length / rowsPerPage)

    // Use Effect here
    // // For Fetching Data From Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const existedTickets = await getAllTickets() // Uncomment this when finish backend
                // const existedTickets = ticketsData; // Delete this when finish backend
                if (existedTickets.length !== 0) {
                    setticketData(existedTickets.data)
                } else {
                    setticketData([])
                    console.log('No Data Fetched')
                }
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    // // For filtering data based on the search term
    useEffect(() => {
        const filtered = ticketData.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        )
        setFilteredData(filtered)
        setCurrentPage(0) // Reset to the first page when searching
    }, [searchTerm, ticketData])

    // // For updating header checkbox state dynamically
    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = someSelected && !allSelected
        }
    }, [someSelected, allSelected])

    // // For determining default dropdown value and button state based on selected rows
    useEffect(() => {
        const selectedStatuses = ticketData
            .filter((row) => selectedRows[row.id])
            .map((row) => row.column6)

        if (selectedStatuses.length === 0) {
            setDropdownValue('')
            setIsDropdownDisabled(true)
            setIsButtonDisabled(true)
        } else if (new Set(selectedStatuses).size === 1) {
            setDropdownValue(selectedStatuses[0])
            setIsDropdownDisabled(false)
            setIsButtonDisabled(false)
        } else {
            setDropdownValue('')
            setIsDropdownDisabled(true)
            setIsButtonDisabled(true)
        }
    }, [selectedRows, ticketData])

    // Functions here
    // // Handle sorting
    const handleSort = (key) => {
        const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
        const sortedData = [...ticketData].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
            return 0
        })
        setSortConfig({ key, direction })
        setticketData(sortedData)
    }

    // Handle selecting/deselecting all rows
    const handleSelectAll = () => {
        const newSelectedRows = {}
        ticketData.forEach((row) => {
            newSelectedRows[row.id] = !allSelected
        })
        setSelectedRows(newSelectedRows)
    }

    // // Handle individual row selection
    const handleRowSelect = (id) => {
        setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    // // Handle updating tour status
    const handleUpdateStatus = () => {
        const updatedData = ticketData.map((row) =>
            selectedRows[row.id] ? { ...row, column6: dropdownValue } : row
        )
        setticketData(updatedData)
        setSelectedRows({})
    }

    // // Handle page change
    const handlePageChange = (selectedItem) => {
        setCurrentPage(selectedItem.selected)
    }

    return (
        <div className="flex w-full flex-wrap p-6">
            <Header title="Quản lý Đặt Vé" />
            <Breadcrumb />
            <div className="w-full">
                {/* Search Bar */}
                <div className="mb-10">
                    <input
                        type="text"
                        placeholder="Tìm kiếm thông tin Đặt vé ..."
                        className="w-1/2 rounded-xl6 border border-gray-300 px-3 py-6 text-xl shadow-lg"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dropdown and Button */}
                <div className="mb-4 flex gap-2 p-2">
                    <span className="text-black">Cập nhật tình trạng vé: </span>
                    <select
                        className={`rounded border border-gray-300 p-2 ${
                            isDropdownDisabled ? 'bg-gray-100 text-gray-300' : 'bg-white text-black'
                        }`}
                        value={dropdownValue}
                        onChange={(e) => setDropdownValue(e.target.value)}
                        disabled={isDropdownDisabled}
                    >
                        <option value="">Chọn trạng thái</option>
                        <option value="Đang thực hiện">Đã thanh toán (Tiền mặt)</option>
                        <option value="Kết thúc">Đã thanh toán (Chuyển khoản)</option>
                        <option value="Đầy chỗ">Hủy vé</option>
                    </select>
                    <button
                        className={`rounded px-4 py-2 ${
                            isButtonDisabled
                                ? 'bg-gray-300 text-gray-100'
                                : 'bg-gradient-to-t from-[#10b5cb] to-[#0073a8] text-white hover:bg-gradient-to-t hover:from-[#0073a8] hover:to-[#10b5cb]'
                        }`}
                        onClick={handleUpdateStatus}
                        disabled={isButtonDisabled}
                    >
                        Cập nhật
                    </button>
                </div>
                <div className="rounded-2xl bg-white p-3 shadow-lg">
                    {/* Table */}
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-cyan-100">
                                {/* Tickbox in Header */}
                                <th className="border-b-4 border-b-[#0073a8] p-2 py-4 text-center text-black transition-colors duration-300 hover:bg-[#51daec] hover:text-yellow-100">
                                    <input
                                        ref={headerCheckboxRef}
                                        type="checkbox"
                                        className="h-4 w-4 hover:cursor-pointer"
                                        checked={allSelected}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                {headers.map((header, index) => (
                                    <th
                                        key={index}
                                        className="border-b-4 border-b-[#0073a8] p-2 py-4 text-center font-bold text-black transition-colors duration-300 hover:cursor-pointer hover:bg-[#51daec] hover:text-yellow-100"
                                        onClick={() => handleSort(`column${index + 1}`)}
                                    >
                                        {header}
                                        {sortConfig.key === `column${index + 1}` &&
                                            (sortConfig.direction === 'asc' ? ' ▲' : ' ▼')}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((row) => (
                                <tr key={row.id} className="hover:bg-yellow-50">
                                    <td
                                        className={`border-b-2 border-b-gray-200 p-2 py-4 text-center ${
                                            selectedRows[row.id] ? 'bg-yellow-100' : ''
                                        }`}
                                    >
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 hover:cursor-pointer"
                                            checked={selectedRows[row.id] || false}
                                            onChange={() => handleRowSelect(row.id)}
                                        />
                                    </td>
                                    {Object.entries(row)
                                        .filter(([key]) => key !== 'id')
                                        .map(([key, value]) => (
                                            <td
                                                key={key}
                                                className={`border-b-2 border-b-gray-200 p-2 py-4 text-center ${
                                                    row.column6 === 'Đã thanh toán (Chuyển khoản)'
                                                        ? 'text-blue-500'
                                                        : row.column6 === 'Đã thanh toán (Tiền mặt)'
                                                          ? 'text-green-500'
                                                          : row.column6 === 'Hủy vé'
                                                            ? 'text-red-500'
                                                            : ''
                                                } ${selectedRows[row.id] ? 'bg-yellow-100' : ''}`}
                                            >
                                                {value}
                                            </td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Pagination */}
                    <div className="mt-4 flex justify-center">
                        <ReactPaginate
                            previousLabel={
                                <img src={PaginationPrev} alt="Icon chuyển trang tiếp theo" />
                            }
                            nextLabel={
                                <img src={PaginationNext} alt="Icon chuyển trang trước đó" />
                            }
                            breakLabel={'...'}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageChange}
                            containerClassName={'mt-4 flex justify-center'}
                            pageClassName={
                                'm-2 flex flex-wrap rounded-lg text-black hover:bg-gradient-to-tl hover:from-[#51daec] hover:to-sky-100'
                            }
                            pageLinkClassName="p-3"
                            previousClassName={
                                'm-2 flex flex-wrap rounded-lg bg-[#EFEFEF] hover:bg-sky-200'
                            }
                            previousLinkClassName="p-3"
                            nextClassName={
                                'm-2 flex flex-wrap rounded-lg bg-[#EFEFEF] hover:bg-sky-200'
                            }
                            nextLinkClassName="p-3"
                            activeClassName="flex flex-wrap rounded-lg bg-[#51daec] font-bold text-black hover:bg-gradient-to-tl hover:from-[#51daec] hover:to-sky-100"
                            disabledClassName="cursor-not-allowed"
                            disabledLinkClassName="cursor-not-allowed"
                            breakClassName={'m-2 flex flex-wrap'}
                            breakLinkClassName="p-3"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tickets
