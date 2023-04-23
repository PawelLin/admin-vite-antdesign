/**
 * 防抖
 * @param fn
 * @param delay
 */
export function debounce(fn: () => void, delay = 300) {
    let timeout: number | null = null
    return () => {
        timeout && clearTimeout(timeout)
        timeout = setTimeout(fn, delay)
    }
}

/**
 * 节流
 * @param fn
 * @param delay
 */
export function throttle(fn: () => void, delay = 300) {
    let canRun = true
    return () => {
        if (canRun) {
            canRun = false
            setTimeout(() => {
                fn()
                canRun = true
            }, delay)
        }
    }
}
