import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  error: Error | string
  onRetry?: () => void
  title?: string
}

export function ErrorState({ error, onRetry, title = 'Something went wrong' }: ErrorStateProps) {
  const errorMessage = typeof error === 'string' ? error : error.message

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-fade-in">
      <div className="rounded-full bg-red-50 p-4 mb-4">
        <AlertCircle className="h-8 w-8 text-red-500" />
      </div>

      <h3 className="text-lg font-serif font-semibold text-warm-900 mb-2">
        {title}
      </h3>

      <p className="text-warm-600 text-sm max-w-md mb-6">
        {errorMessage}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-warm-500 hover:bg-warm-600 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
