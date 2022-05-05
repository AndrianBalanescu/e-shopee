import axios from 'axios'
import queryString from 'query-string'

const baseDomain = 'https://127.0.0.1:80'
const baseUrl = `${baseDomain}/api/v2`
export const useToken = () => {
  return JSON.parse(localStorage.getItem('accessToken')).token || ''
}
const token = useToken()

const AxiosInstance = axios.create({
  baseUrl,
  headers: {
    'content-type': 'application/json',
    // 'Authorization': `Bearer ${this.getToken()}`,
  },
  paramsSerializer: params => queryString.stringify(params),
  responseEncoding: 'utf8',
})

AxiosInstance.interceptors.request.use(
  async(request) => {
    if (token)
      request.headers.token = `Bearer ${token}`

    return request
  },
  (error) => {
    return Promise.reject(error)
  },
)
AxiosInstance.interceptors.response.use(
  (response) => {
    if (response && response.data)
      return response.data

    return response
  },
  (error) => {
    // console.error(error.response);
    return Promise.reject(error)
  },
)

export default AxiosInstance
