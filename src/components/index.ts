import { App } from 'vue'
import * as icons from '@ant-design/icons-vue'
export default {
    install(app: App) {
        Object.keys(icons).forEach((key) => {
            app.component(key, icons[key as keyof typeof icons])
        })
    },
}
