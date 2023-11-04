import { ofetch } from 'ofetch'
import conf from './conf'

class Api {
  send(url: string, method: string, data: any = null) {
    const headers = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    }
    return ofetch(this.url(url), { headers, retry: 3, method, body: data })
  }

  url(addUrl: string) {
    return conf.baseUrl + addUrl
  }

  get(url: string) {
    return this.send(url, 'GET')
  }

  post(url: string, data: any) {
    return this.send(url, 'POST', data)
  }

  put(url: string, data: any) {
    return this.send(url, 'PATCH', data)
  }

  remove(url: string) {
    return this.send(url, 'DELETE')
  }
}

const api = new Api()
export default api
