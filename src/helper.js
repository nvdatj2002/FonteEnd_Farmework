export const paginate = (array, limit, page) => {
    return array.slice((page - 1) * limit, page * limit);
  };

export const parseVND = (money) => {
  return parseInt(money).toLocaleString('vi', { style: 'currency', currency: 'VND' })
}