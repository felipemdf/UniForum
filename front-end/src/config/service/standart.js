import axios from 'axios'

const standard = axios.create({
  baseURL: process.env.api.BASE_URL,
  timeout: 100000,
  transformResponse: [
    function (data) {
      return data
    }
  ]
})

// standard.interceptors.response.use(..., ...)

export default standard