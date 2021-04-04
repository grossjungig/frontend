export const addAuthHeader = (config) => {
    const token = localStorage.getItem('token')
    if (token) {
        const authVal = `Bearer ${token}`
        config.headers.Authorization = authVal;
    }
    return config;
}