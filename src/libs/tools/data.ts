const isObject = (value: unknown) => typeof value === 'object'
const isNone = (value: unknown) => (isObject(value) ? !Object.keys(value as object).length : !value && value !== 0)

/**
 *
 * @param {*} target 对象
 * @param {*} source 对象
 * @param [*] filter 只针对filter
 * @param boolean strict 是否严格校验 (非严格{}, '', undefined, null都视为相等)
 * @description 判断两个对象是否相等，这两个对象的值可以是数字/字符串/对象
 */
export function objNotEqual(target: object, source: object, filter: string[] = [], strict = false): boolean {
    if (!isObject(target) || !isObject(source)) {
        if (!strict && isNone(target) && isNone(source)) {
            return false
        }
        return target !== source
    }
    const keys1 = Object.keys(target).filter((item) => !filter.length || filter.includes(item))
    const keys2 = Object.keys(source).filter((item) => !filter.length || filter.includes(item))
    if (strict && keys1.length !== keys2.length) {
        return true
    }
    return keys1.some((key) => {
        const key1 = key as keyof typeof target
        return objNotEqual(target[key1], source[key1])
    })
}

/**
 *
 * @param [*] list 数组
 * @description 根据数组每项的key和value转化为对象[key: value]
 */
export function array2object(list: { key: string; value: string }[]): object {
    return list.reduce(
        (item, { key, value }) => ((item[key] = value) && item) || item,
        {} as { [x in typeof list[number]['key']]: string }
    )
}
