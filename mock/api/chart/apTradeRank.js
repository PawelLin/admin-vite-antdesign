next(null, {
    code: '0000',
    data: {
        //AP交易排行
        apTradeRankVOS: [
            {
                apName: '服务A',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务B',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务C',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务D',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务E',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务F',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务G',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务H',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            {
                apName: '服务I',
                sumAllTrade: Math.ceil(Math.random() * 1000),
                sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
            },
            ...(req.data.dateType === '4'
                ? [
                      {
                          apName: '服务J',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                      {
                          apName: '服务K',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                      {
                          apName: '服务L',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                      {
                          apName: '服务M',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                      {
                          apName: '服务N',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                      {
                          apName: '服务O',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                      {
                          apName: '服务P',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                      {
                          apName: '服务Q',
                          sumAllTrade: Math.ceil(Math.random() * 1000),
                          sumAllTradeEquipment: Math.ceil(Math.random() * 1000),
                      },
                  ]
                : []),
        ],

        //查询开始时间
        totalBeginDate: 1590940800000,
        //查询结束时间
        totalEndDate: 1620403199316,
    },
})
