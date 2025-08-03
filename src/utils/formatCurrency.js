export const formatVND = (amount) => {
    if (!amount || isNaN(amount)) return '0₫'
    return amount.toLocaleString('vi-VN') + 'VNĐ'
}
