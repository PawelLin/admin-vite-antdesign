function getNumber() {
    let num = Math.floor(Math.random() * (1 - 5) + 5)
    let times = 1
    let count = 1
    for (let i = 0; i < num; i++) {
        count *= Math.random() * times
        times *= 10
    }
    return Number(count).toFixed(2)
}

const data = [
    { auditAmt: getNumber(), auditPercent: '', productType: '01' },
    { auditAmt: getNumber(), auditPercent: '', productType: '02' },
    { auditAmt: getNumber(), auditPercent: '', productType: '03' },
    { auditAmt: getNumber(), auditPercent: '', productType: '04' },
]
let percent = 0
const count = data.reduce((total, item) => {
    item.auditAmt = Number(item.auditAmt || 0)
    return total + item.auditAmt
}, 0)
data.sort((a, b) => a.auditAmt - b.auditAmt).forEach((item, index) => {
    if (data.length - 1 === index) {
        item.auditPercent = Number(100 - percent).toFixed(2)
    } else {
        item.auditPercent = parseFloat((item.auditAmt / count) * 100).toFixed(2)
        percent += Number(item.auditPercent)
    }
})
next(null, {
    code: '0000',
    message: 'ok',
    data: data,
})
