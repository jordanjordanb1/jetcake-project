export const isProd = () => {
    const isProd = true

    return isProd
}

const URL = () => {
    if (isProd()) {
        return 'https://jetcakes-project.herokuapp.com' // Set in future
    } else {
        return 'http://localhost:3001'
    }
}

export const config = {
    url: URL()
}
