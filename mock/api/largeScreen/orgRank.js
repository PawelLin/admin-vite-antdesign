next(null, {
    code: '0000',
    message: 'ok',
    data: Array.from(new Array(50)).map((item, index) => ({
        seq: index + 1,
        orgName: `名称${Array.from(new Array(15))
            .map((item) => String.fromCharCode(index + 65))
            .join('')}`,
        applyCount: Math.floor(Math.random() * 100000),
        auditCount: Math.floor(Math.random() * 100000),
        auditAmt: Math.floor(Math.random() * 1000000),
        signAmt: Math.floor(Math.random() * 1000000),
        loanAmt: Math.floor(Math.random() * 1000000),
        makeLoanAmt: Math.floor(Math.random() * 1000000),
    })),
})
