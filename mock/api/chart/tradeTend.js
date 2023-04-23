const two = (value) => (value.toString().length === 1 ? `0${value}` : value)
const month = new Date().getMonth() + 1
const xAxisDateData = {
    1: Array.from(Array(12)).map((item, index) => `2021/${index + 1}/1`),
    3: Array.from(Array(14)).map((item, index) => `2021/${two(month)}/${two(index + 1)}`),
    4: Array.from(Array(24)).map((item, index) => `${two(index + 1)}:00`),
}
const number = {
    1: 12,
    3: 14,
    4: 24,
}
const type = req.data.dateType

next(null, {
    code: '0000',
    data: {
        /**
         * 成失败数据
         */
        seriesFailData: Array.from(Array(number[type])).map(() => Math.ceil(Math.random() * 100)),
        /**
         * 成功数据
         */
        seriesSuccData: Array.from(Array(number[type])).map(
            () => Math.ceil(Math.random() * 100) * (type === '1' ? 20 : 1)
        ),
        /**
         * 总开始时间
         */
        totalBeginDate: 1590940800000,
        /**
         * 总结束时间
         */
        totalEndDate: 1620403199140,
        /**
         * 日期时间数据
         * xAxis数据
         */
        xAxisDateData: xAxisDateData[type],
    },
})
