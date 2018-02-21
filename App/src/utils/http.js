import axios from 'axios'
const axiosBaseurl = require('../../config').axiosBaseurl
axios.defaults.baseURL = axiosBaseurl
axios.defaults.withCredentials = true
export default axios