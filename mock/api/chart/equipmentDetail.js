const two = (value) => (value.toString().length === 1 ? `0${value}` : value)
const month = new Date().getMonth() + 1
next(null, {
    code: '0000',
    data: {
        /**
         * AP每个日期节点的数据
         */
        equipmentDetails: [
            /**
             * AP名称:name
             */
            /**
             * AP每个日期节点的数据:data
             */
            { name: '设备A', apUsedData: Array.from(Array(14)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备B', apUsedData: Array.from(Array(14)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备C', apUsedData: Array.from(Array(14)).map(() => Math.ceil(Math.random() * 1000)) },
            {
                name: '设备D',
                apUsedData: Array.from(Array(14)).map(() => Math.ceil(Math.random() * 1000)),
            },
            {
                name: '设备E',
                apUsedData: Array.from(Array(14)).map(() => Math.ceil(Math.random() * 1000)),
            },
            { name: '设备F', apUsedData: Array.from(Array(14)).map(() => Math.ceil(Math.random() * 1000)) },
        ],
        /**
         * AP列表
         */
        legendApsData: ['设备A', '设备B', '设备C', '设备D', '设备E', '设备F'],
        /**
         * 总开始时间
         */
        totalBeginDate: 1590940800000,
        /**
         * 总结束时间
         */
        totalEndDate: 1620403199142,
        /**
         * 日期时间数据
         * xAxis数据
         */
        xAxisDateData: Array.from(Array(14)).map((item, index) => `2021/${two(month)}/${two(index + 1)}`),
    },
})
