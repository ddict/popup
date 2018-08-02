// auto resize textareas
export default {
    init,
    autoResize,
}

const MIN_HEIGHT = 100
const MAX_HEIGHT = 600
const PADDING = 10

function init(el, max_length) {
    if (max_length) {
        el.maxlength = max_length
    }
    el.spellcheck = false
    setHeigtht(el, MIN_HEIGHT)
}

// const el = this.$refs.input
function autoResize(el) {
    if (el.value == '') {
        setHeigtht(el, MIN_HEIGHT)
        return
    }

    if (el.scrollHeight < MIN_HEIGHT) {
        setHeigtht(el, MIN_HEIGHT)
        return
    }

    if (el.scrollHeight > MAX_HEIGHT) {
        setHeigtht(el, MAX_HEIGHT)
        return
    }

    const el_height = el.style.height.replace('px', '')
    if (el_height > el.scrollHeight) {
        return
    }

    setHeigtht(el, el.scrollHeight + PADDING)
}

function setHeigtht(el, height) {
    el.style.height = `${height}px`
}