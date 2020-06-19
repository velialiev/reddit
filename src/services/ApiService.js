import axios from 'axios'

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use((res) => res.data.data)

class ApiService {
  static get(url) {
    return axiosInstance.get(url)
  }
}

export default ApiService
