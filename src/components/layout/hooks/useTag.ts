import { ref, watch, nextTick, onMounted, onUnmounted, Ref } from 'vue'
import { Tag as TagComp } from 'ant-design-vue'
import { Tag } from './model'
export function useTag(list: Tag[], collapsed: Ref<boolean>) {
    const navList = ref<HTMLDivElement | null>(null)
    const navScroll = ref<HTMLDivElement | null>(null)
    const navItem = ref<InstanceType<typeof TagComp>[]>([])
    const translateX = ref(0)
    const showIcon = ref(false)
    const marginX = 8
    const transitionTime = 300
    onMounted(() => {
        changePosition()
        window.addEventListener('resize', resizePosition, false)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', resizePosition, false)
    })
    watch(list, () => changePosition())
    watch(collapsed, () => {
        setTimeout(changePosition, 200) // 侧边栏动画200ms
    })
    function moveNavScroll(direction: 'left' | 'right') {
        const listWidth = navList.value?.offsetWidth || 0
        const scrollWidth = navScroll.value?.offsetWidth || 0
        const maxMoveDistance = scrollWidth - listWidth
        if (direction === 'left') {
            const value = translateX.value + 160
            translateX.value = Math.min(value, 0)
        } else {
            const value = translateX.value - 160
            translateX.value = Math.max(value, -maxMoveDistance)
        }
    }
    function resizePosition() {
        return changePosition(true)
    }
    function changePosition(delay = false) {
        nextTick(() => {
            const navListWidth = navList.value?.offsetWidth || 0
            const navScrollWidth = navScroll.value?.offsetWidth || 0
            const maxMoveDistance = navScrollWidth - navListWidth
            if (maxMoveDistance < 0) {
                showIcon.value = false
                translateX.value = 0
                return
            } else {
                showIcon.value = true
            }
            list.forEach((item, index) => {
                if (item.meta?.active) {
                    setTimeout(
                        () => {
                            nextTick(() => {
                                const navListWidth = navList.value?.offsetWidth || 0
                                const navScrollWidth = navScroll.value?.offsetWidth || 0
                                const maxMoveDistance = navScrollWidth - navListWidth
                                const navScrollTranslateX = Math.abs(translateX.value)
                                const totalNavLeft = navListWidth + navScrollTranslateX
                                const { offsetLeft, offsetWidth } = navItem.value[index].$el
                                const totalLeft = offsetLeft + offsetWidth
                                if (navScrollTranslateX > offsetLeft) {
                                    translateX.value = -offsetLeft + marginX
                                }
                                if (totalNavLeft < totalLeft) {
                                    translateX.value = navListWidth - totalLeft - marginX
                                }
                                if (navListWidth > navScrollWidth) {
                                    translateX.value = Math.min(translateX.value, 0)
                                } else {
                                    translateX.value = Math.max(translateX.value, -maxMoveDistance)
                                }
                            })
                        },
                        delay ? transitionTime : 0
                    )
                }
            })
        })
    }
    return { translateX, showIcon, marginX, transitionTime, moveNavScroll, changePosition, navList, navScroll, navItem }
}
