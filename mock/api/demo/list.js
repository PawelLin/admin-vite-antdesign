const { name, type, address, current, pageNo = 10 } = req.data

const all = [
    { id: 1, name: 'Vue', type: 'framework', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'Vue Router', type: 'npm', address: 'https://router.vuejs.org/zh/' },
    { id: 1, name: 'Pinia', type: 'npm', address: 'https://pinia.vuejs.org/' },
    { id: 1, name: 'Ant Design', type: 'ui', address: 'https://antdv.com/docs/vue/introduce-cn' },
    { id: 1, name: 'vue', type: 'npm', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
    { id: 1, name: 'vue', type: '1', address: 'https://staging-cn.vuejs.org/' },
]
const data = all
    .filter(
        (item) =>
            (!name || item.name.toUpperCase().includes(name.toUpperCase())) &&
            (!type || item.type === type) &&
            (!address || item.address.toUpperCase().includes(address.toUpperCase()))
    )
    .slice(pageNo * (current - 1), pageNo * current)

next(null, {
    code: '0000',
    data: data,
    page: {
        current: 1,
        total: name || type || address ? data.length : all.length,
    },
})
