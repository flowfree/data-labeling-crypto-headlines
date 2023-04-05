import { Link } from 'react-router-dom'

interface PrimaryButtonProps {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isSubmitting?: boolean
  children: React.ReactNode
}

export function PrimaryButton({ 
  className, 
  onClick, 
  children 
}: PrimaryButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface PrimaryButtonLinkProps {
  to: string
  className?: string
  children: React.ReactNode
}

export function PrimaryButtonLink({ 
  to, 
  className, 
  children 
}: PrimaryButtonLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      {children}
    </Link>
  )
}

interface SecondaryButtonProps {
  className?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  isSubmitting?: boolean
  children: React.ReactNode
}

export function SecondaryButton({ 
  className, 
  onClick, 
  children 
}: SecondaryButtonProps) {
  return (
    <button
      className={`flex items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-100 py-2 px-4 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

interface SecondaryButtonLinkProps {
  to: string
  className?: string
  children: React.ReactNode
}

export function SecondaryButtonLink({ 
  to, 
  className, 
  children 
}: SecondaryButtonLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center justify-center gap-1 rounded-md border border-transparent bg-indigo-100 py-2 px-4 text-sm font-medium text-indigo-700 shadow-sm hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}
    >
      {children}
    </Link>
  )
}

interface PlainButtonProps {
  className?: string
  children: React.ReactNode
  onClick?: (e: React.MouseEvent) => void
}

export function PlainButton({ 
  className, 
  children, 
  onClick 
}: PlainButtonProps) {
  return (
    <button 
      className={`rounded-md border border-gray-500 border-transparent py-2 px-4 text-sm font-medium text-gray-800 hover:text-gray-500 focus:outline-none ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
