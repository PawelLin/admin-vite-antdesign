next(null, {
    code: '0000',
    message: 'ok',
    data: {
        applyCount: Number(new Date().getTime().toString().substr(4, 6)),
        surveyFinishCount: Number(new Date().getTime().toString().substr(4, 6)),
        remoteAuditCount: Number(new Date().getTime().toString().substr(4, 6)),
        auditCount: Number(new Date().getTime().toString().substr(4, 6)),
        auditAmt: Number(new Date().getTime().toString().substr(4, 6)) + 0.99,
        signAmt: Number(new Date().getTime().toString().substr(4, 6)) + 0.99,
        loanAmt: Number(new Date().getTime().toString().substr(4, 6)) + 0.99,
    },
})
