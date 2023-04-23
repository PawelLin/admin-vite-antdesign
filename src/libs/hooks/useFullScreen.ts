import { ref, onMounted, onUnmounted } from 'vue'

export function useFullScreen() {
    const fullScreen = ref(false)
    function changeFullScreen() {
        fullScreen.value = !!document.fullscreenElement
    }
    function onFullScreen(selector: string | HTMLElement) {
        const fullscreenDiv = (
            typeof selector === 'string' ? document.querySelector(selector) : selector
        ) as HTMLElement
        let fullscreenFunc = fullscreenDiv.requestFullscreen
        if (!fullscreenFunc) {
            for (const key of ['mozRequestFullScreen', 'msRequestFullscreen', 'webkitRequestFullScreen']) {
                fullscreenFunc = fullscreenFunc || fullscreenDiv[key as keyof typeof fullscreenDiv]
            }
        }
        fullscreenFunc.call(fullscreenDiv)
    }
    function exitFullScreen() {
        let fullscreenFunc = document.exitFullscreen
        if (!fullscreenFunc) {
            for (const key of ['mozCancelFullScreen', 'msExitFullscreen', 'webkitExitFullscreen']) {
                fullscreenFunc = fullscreenFunc || document[key as keyof typeof document]
            }
        }
        fullscreenFunc.call(document)
    }
    function toggleFullScreen(selector: string | HTMLElement) {
        if (fullScreen.value) {
            exitFullScreen()
        } else {
            onFullScreen(selector)
        }
    }
    onMounted(() => {
        document.addEventListener('fullscreenchange', changeFullScreen)
    })
    onUnmounted(() => {
        document.removeEventListener('fullscreenchange', changeFullScreen)
    })
    return { fullScreen, onFullScreen, exitFullScreen, toggleFullScreen }
}
