import BaseService from "./BaseService";

class NewsService extends BaseService {
  getNewsList(nextUrl: string, filters: string = '') {
    filters = filters.replace(/\s+/g, ' ').replace(/\s*:\s*/g, ':').trim()
    const params: {[key: string]: string} = {}

    for (const filter of filters.split(' ')) {
      if (/^https?:/.test(filter)) {
        params['url'] = filter
      } else {
        const [key, ...rest] = filter.split(':')
        const val = rest.join(':')
        if (key && val) {
          params[key] = val
        } else {
          params['url'] = key
        }
      }
    }

    return this.client.get(nextUrl, { params })
  }

  addNews(url: string, sentiment: string) {
    return this.client.post(`/data-labeling/news`, { url, sentiment })
  }
  
  updateNewsSentiment(news: News, sentiment: string) {
    const { id, url } = news
    return this.client.put(`/data-labeling/news/${id}`, { url, sentiment })
  }

  deleteNews(id: number) {
    return this.client.delete(`/data-labeling/news/${id}`)
  }

  getSentiment(url: string) {
    const params = { url }
    return this.client.get(`/news-sentiment`, { params })
  }
}

export default NewsService
