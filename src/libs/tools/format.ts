/**
 *
 * @param value 金额
 * @param decimalPlaces 小数点位数
 * @returns
 */
export function amountFormatting(value: unknown, decimalPlaces?: number): string {
    if (!value && value !== 0) return ''
    const number = Number(value)
    if (isNaN(number)) return ''
    const numberStr = decimalPlaces || decimalPlaces === 0 ? number.toFixed(decimalPlaces) : number.toString()
    const [integer, decimal = ''] = numberStr.split('.')
    return integer.replace(/\B(?=((?:\d{3})+(?!\d)))/g, ',') + (decimal && `.${decimal}`)
}

/**
 *
 * @param date 日期
 * @param format 格式化
 * @returns
 */
export const dateFormat = (date: Date, format = 'yyyy-MM-dd') => {
    if (date) {
        date = date instanceof Date ? date : new Date(date)
        const data = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            S: date.getMilliseconds(),
        }
        format = format.replace(/y+/, (match) => `${new Date().getFullYear()}`.substring(4 - match.length))
        Object.keys(data).forEach((key) => {
            format = format.replace(new RegExp(key), (match) => {
                const str = `0${data[key as keyof typeof data]}`
                return str.substring(str.length - match.length)
            })
        })
        return format
    }
    return ''
}
