import axios, { AxiosInstance } from 'axios'
import axiosRetry from 'axios-retry'

const baseURL = process.env.REACT_APP_API_BASE_URL

class BaseService {
  client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL,
      headers: {'Content-Type': 'application/json'}
    })

    axiosRetry(this.client, {
      retries: 7,
      retryDelay: () => 1000,
      retryCondition: (error) => {
        const { status } = error.response || {}
        if (status && (status >= 400 && status <= 499)) {
          // Bad request etc
          return false
        } else if (status && (status >= 500)) {
          // Internal server errors
          return false
        }
        return true
      }
    })
  }
}

export default BaseService
