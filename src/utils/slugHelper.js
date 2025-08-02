export const createSlug = (text) => {
    return text
        .toLowerCase() // chuyển về chữ thường trước để giữ "đ" thành "d"
        .normalize('NFD') // tách dấu
        .replace(/[\u0300-\u036f]/g, '') // xóa dấu (sắc, huyền, hỏi, ngã, nặng)
        .replace(/đ/g, 'd') // chuyển riêng "đ" thành "d"
        .replace(/[^a-z0-9\s-]/g, '') // giữ lại a-z, 0-9, khoảng trắng, dấu -
        .trim()
        .replace(/\s+/g, '-') // thay space bằng dấu gạch ngang
        .replace(/-+/g, '-') // gộp nhiều dấu - liên tiếp thành 1
}
