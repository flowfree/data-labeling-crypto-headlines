import { AxiosError } from 'axios'
import { useState } from 'react'
import NewsService from '../../services/NewsService'
import NewsCard from '../../components/NewsCard'
import SentimentLabel from '../../components/SentimentLabel'
import { SecondaryButtonLink } from '../../components/Buttons'

export default function AddNews() {
  const [url, setUrl] = useState('')
  const [sentiment, setSentiment] = useState('')
  const [newsList, setNewsList] = useState<News[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const newsService = new NewsService()

  async function handleAdd(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    if (isSubmitting) {
      return
    } else if (url.trim() === '') {
      setErrorMessage('Please enter the URL.')
      return
    } else if (sentiment === '') {
      setErrorMessage('Please select the sentiment.')
      return
    }

    try {
      setErrorMessage('')
      setIsSubmitting(true)
      const response = await newsService.addNews(url, sentiment)
      if (newsList.length == 4) {
        newsList.pop()
      } 
      setNewsList([response.data, ...newsList])
      setUrl('')
      setSentiment('')
    } catch (error) {
      console.error(error)
      if (error instanceof AxiosError && error.response?.data) {
        for (const key in error.response.data) {
          setErrorMessage(error.response.data[key][0])
        }
      }
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <div>

      <div className="w-full mt-5">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Data Labeling
          <span className="ml-2 text-lg font-normal text-gray-400">
            - Crypto news sentiment analysis
          </span>
        </h1>
        <div className="mt-5 flex gap-10">
          <form method="post" action="" className="flex grow gap-2">
            <input 
              type="text" 
              name="url"
              className="block grow max-w-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter News URL"
              autoComplete="off"
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
            <select 
              name="sentiment"
              className="block rounded-md border-gray-300 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              value={sentiment}
              onChange={e => setSentiment(e.target.value)}
            >
              <option value="">-- Sentiment --</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="mixed">Mixed</option>
              <option value="neutral">Neutral</option>
            </select>
            <button
              className="w-32 rounded-md border border-transparent bg-indigo-600 py-0 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleAdd}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>
      </div>

      <div>
        {errorMessage && <p className="pt-1 text-sm text-red-700">{errorMessage}</p>}
      </div>

      <div>
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
          {newsList.length > 0 && (
            <p className="mt-5 mb-2 font-bold">
              Recently added news
            </p>
          )}
          <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-8">
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
        </div>

      </div>
    </div>
  )
}
