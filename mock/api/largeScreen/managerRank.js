next(null, {
    code: '0000',
    message: 'ok',
    data: Array.from(new Array(50)).map((item, index) => ({
        seq: index + 1,
        managerName: `姓名${index + 1}`,
        orgName: `名称${Array.from(new Array(1))
            .map((item) => String.fromCharCode(index + 65))
            .join('')}`,
        auditCount: Math.floor(Math.random() * 100),
        auditAmt: Math.floor(Math.random() * 10000),
        loanAmt: Math.floor(Math.random() * 10000),
    })),
})
