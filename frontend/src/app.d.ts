// This file contains the types for the News Sentiment project 

interface Site {
  id: string
  name: string
  url?: string
}

interface News {
  id: number
  title: string
  description: string
  url: string
  imageUrl: string
  sentiment: 'positive' | 'neutral' | 'negative'
  site: Site
  publishedTime: string
  createdAt: string
  updatedAt: string
}
