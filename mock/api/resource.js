setTimeout(() => {
    next(null, {
        code: '0000',
        data: {
            menus: [
                { title: '开发示例', icon: 'desktop-outlined', parentId: 0, id: 2, name: 'Demo' },
                { title: '列表', icon: 'table-outlined', parentId: 2, id: 21, name: 'DemoList' },
                {
                    title: '表单',
                    icon: 'profile-outlined',
                    parentId: 2,
                    id: 22,
                    name: 'DemoForm',
                },
                { title: 'iframe', icon: 'block-outlined', parentId: 0, id: 3, name: 'Iframe' },
                {
                    title: 'ant-design-vue',
                    icon: 'custom-ant-design',
                    parentId: 3,
                    id: 31,
                    name: 'https://antdv.com/components/overview',
                },
                { title: 'iview', icon: 'custom-iview', parentId: 3, id: 32, name: 'https://www.iviewui.com/' },
            ],
            buttons: [],
        },
        message: '网络繁忙',
    })
}, 0)
