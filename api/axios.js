import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:4200/api/'
})

export default api