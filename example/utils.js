export const debounce = (fn, delay= 100) => {
    let timer = null

    return (...args) => {
        if (timer) clearTimeout(timer)

        timer = setTimeout(() => {
            fn(...args)
            timer = null
        }, delay)
    }
}
