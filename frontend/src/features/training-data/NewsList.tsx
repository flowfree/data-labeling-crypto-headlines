import { useState, useEffect } from 'react'
import NewsService from '../../services/NewsService'
import NewsCard from '../../components/NewsCard'
import SentimentLabel from '../../components/SentimentLabel'
import FilterForm from './FilterForm'
import { PrimaryButton } from '../../components/Buttons'

const NEWS_ENDPOINT_PATH = '/data-labeling/news'

export default function NewsList() {
  const [newsList, setNewsList] = useState<News[]>([])
  const [filters, setFilters] = useState('')
  const [url, setUrl] = useState(NEWS_ENDPOINT_PATH)
  const [nextUrl, setNextUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const newsService = new NewsService()

  useEffect(() => {
    document.title = 'Training Data'
  }, [])
  
  useEffect(() => {
    async function loadNewsList() {
      if (url) {
        try {
          setIsLoading(true)
          const response = await newsService.getNewsList(url, filters)
          if (url === NEWS_ENDPOINT_PATH) {
            setNewsList(response.data.results)
          } else {
            setNewsList([...newsList, ...response.data.results])
          }
          setNextUrl(response.data.next)
        } catch (e) {
          console.error(e)
        } finally {
          setIsLoading(false)
          setUrl('')
        }
      }
    }

    loadNewsList()
  }, [url])

  async function handleDelete(id: number) {
    try {
      await newsService.deleteNews(id)
      setNewsList(newsList.filter((n) => n.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  async function handleUpdateSentiment(news: News, sentiment: string) {
    try {
      await newsService.updateNewsSentiment(news, sentiment)
    } catch (e) {
      console.error(e)
    }
  }

  function handleSearch(query: string) {
    setFilters(query)
    setUrl(NEWS_ENDPOINT_PATH)
  }

  function handleRefresh() {
    setFilters('')
    setUrl(NEWS_ENDPOINT_PATH)
  }

  function handleLoadMore(e: React.MouseEvent) {
    e.preventDefault()
    setUrl(nextUrl)
  }

  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl">

      <h1 className="mt-5 text-4xl font-bold tracking-tight text-gray-900">
        Data Labeling
        <span className="ml-2 text-lg font-normal text-gray-400">
          - Crypto news sentiment analysis
        </span>
      </h1>

      <FilterForm 
        className="mt-5"
        onSearch={handleSearch}
        onRefresh={handleRefresh}
      />

      <div className="grid grid-cols-1 mt-10 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
        {newsList.map((news) => (
          <NewsCard 
            key={news.id} 
            news={news} 
            onDelete={handleDelete}
            sentiment={
              <SentimentLabel 
                sentiment={news.sentiment} 
                onUpdate={s => handleUpdateSentiment(news, s)}
              />
            }
          />
        ))}
      </div>

      {nextUrl && (
        <div className="mt-5 text-center">
          <PrimaryButton onClick={handleLoadMore} className="w-64">
            {isLoading ? 'Loading...' : 'Load More'}
          </PrimaryButton>
        </div>
      )}
    </div>
  )
}
