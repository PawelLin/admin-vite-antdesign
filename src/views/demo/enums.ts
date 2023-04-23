import { array2object } from '@/libs/tools'

export const TYPE_LIST = [
    { key: 'ui', value: 'UI库' },
    { key: 'framework', value: '框架' },
    { key: 'npm', value: 'NPM包' },
]

export const TYPE_ENUMS = array2object(TYPE_LIST)
export const TYPE_COLORS: { [x in typeof TYPE_LIST[number]['key']]: string } = {
    ui: 'pink',
    framework: 'green',
    npm: 'orange',
}
