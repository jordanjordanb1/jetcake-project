export const isProd = () => {
    const isProd = false

    return isProd
}

const URL = () => {
    if (isProd()) {
        return '' // Set in future
    } else {
        return 'http://localhost:3001'
    }
}

export const config = {
    url: URL()
}
