next(null, {
    code: '0000',
    data: {
        /**
         * AP列表
         */
        legendApsData: [
            '设备A',
            '设备B',
            '设备C',
            '设备D',
            '设备E',
            '设备F',
            '设备G',
            '设备H',
            '设备I',
            '设备J',
            '设备K',
            '设备L',
            '设备M',
            '设备N',
            '设备O',
        ],
        /**
         * 每个AP使用服务的数据
         */
        serviceDetails: [
            {
                name: '设备A',
                serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)),
            },
            { name: '设备B', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备C', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备D', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备E', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备F', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备G', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备H', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备I', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备J', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            { name: '设备K', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            {
                name: '设备L',
                serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)),
            },
            {
                name: '设备M',
                serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)),
            },
            { name: '设备N', serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)) },
            {
                name: '设备O',
                serviceUsedData: Array.from(Array(9)).map(() => Math.ceil(Math.random() * 1000)),
            },
        ],
        /**
         * 总开始时间
         */
        totalBeginDate: 1590940800000,
        /**
         * 总结束时间
         */
        totalEndDate: 1620403199778,
        /**
         * 服务列表数据
         */
        yAxisServicesData: [
            '服务A',
            '服务B',
            '服务C',
            '服务D',
            '服务E',
            '服务F',
            '服务G',
            '服务H',
            '服务I',
            // "实名认证（身份二要素）",
            // "实人实证核验",
            // "身份证实名有效期认证",
            // "身份证实名实人有效期认证",
            // "电信手机三要素认证",
            // "联通手机三要素认证",
            // "移动手机三要素认证",
            // "银行卡三要素认证",
            // "银行卡四要素认证",
            // "活体检测+自拍照比对",
            // "手持身份证照比对",
            // "H5静默活体+人脸比对",
            // "H5静默活体",
            // "读数字活体",
            // "电子证件识读全要素",
            // "OCR身份证识别",
            // "OCR营业执照识别",
            // "xID服务",
            // "eID数字身份服务",
            // "自拍照比对"
        ],
    },
})
