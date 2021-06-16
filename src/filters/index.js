import moment from "moment";

export const formatTime = (time) => {
    if (!time) return ''
    return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
export const formatNumber = (num) => {
    if (num == 0)  return 0
    if (num)
    return num.toString().replace( /\B(?=(?:\d{3})+\b)/g, ',' )
}
