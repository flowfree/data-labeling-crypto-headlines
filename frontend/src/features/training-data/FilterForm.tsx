import { useState } from 'react'
import { PrimaryButtonLink, SecondaryButton, PlainButton } from '../../components/Buttons'
import { MagnifyingGlassIcon, ArrowPathIcon, PlusIcon } from '@heroicons/react/24/outline'

interface Props {
  className?: string
  onSearch: (query: string) => void
  onRefresh: () => void
}

export default function FilterForm({ className, onSearch, onRefresh }: Props) {
  const [query, setQuery] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    query && onSearch(query)
  }

  function handleRefresh(e: React.MouseEvent) {
    e.preventDefault()
    setQuery('')
    onRefresh && onRefresh()
  }

  return (
    <div className={`flex w-full gap-10 ${className}`}>
      <form method="post" action="" onSubmit={handleSubmit} className="flex grow gap-3">
        <label htmlFor="query" className="font-bold pt-2">
          Search:
        </label>
        <input 
          type="text" 
          name="query"
          className="block grow max-w-2xl rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="E.g: sentiment:positive"
          autoComplete="off"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <SecondaryButton>
          <MagnifyingGlassIcon className="w-4 h-4" />
          Search
        </SecondaryButton>
        <PlainButton className="px-0" onClick={handleRefresh}>
          <ArrowPathIcon className="w-5 h-5" />
        </PlainButton>
      </form>
    </div>
  )
}
