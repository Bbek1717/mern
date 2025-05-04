"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPagination = void 0;
const getPagination = (total, limit, current_page) => {
    const total_pages = Math.ceil(total / limit);
    return {
        total_pages,
        current_page,
        next_page: total_pages > current_page ? current_page + 1 : current_page,
        prev_page: current_page > 2 ? current_page - 1 : 1,
        has_next_page: total_pages > current_page ? true : false,
        has_prev_page: current_page > 1 ? true : false
    };
};
exports.getPagination = getPagination;
