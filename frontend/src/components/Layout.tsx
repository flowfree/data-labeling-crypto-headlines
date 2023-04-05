import { Link } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-full flex flex-col h-screen">

      <div className="max-w-full px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="flex h-14 justify-between">
          <div className="flex w-full">
            <div className="hidden flex-grow sm:-my-px sm:flex sm:space-x-8">
              <Link to="/training-data/add" className='border-transparent hover:border-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                Add data
              </Link>
              <Link to="/training-data" className='border-transparent hover:border-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'>
                View all data
              </Link>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a href="https://github.com/flowfree/news-sentiment-backend" className='border-transparent hover:border-indigo-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium' target="_blank">
                Github
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex-grow">
        {children}
      </div>

      <footer className="bg-white mt-10">
        <div className="mx-auto max-w-full pb-3 px-8">
          <p className="text-sm text-gray-400 text-right">
            Copyright &copy; 2023 Nashruddin Amin
          </p>
        </div>
      </footer>
    </div>
  )
}
