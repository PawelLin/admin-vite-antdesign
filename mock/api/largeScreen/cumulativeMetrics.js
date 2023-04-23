next(null, {
    code: '0000',
    message: 'ok',
    data: {
        applyCount: Math.floor(Math.random() * 100000),
        surveyFinishCount: Math.floor(Math.random() * 100000),
        remoteAuditCount: Math.floor(Math.random() * 100000),
        auditCount: Math.floor(Math.random() * 100000),
        auditAmt: Math.floor(Math.random() * 100000),
        signAmt: Math.floor(Math.random() * 100000),
        loanAmt: Math.floor(Math.random() * 100000),
        passRate: (Math.random() * 10).toFixed(2),
    },
})
