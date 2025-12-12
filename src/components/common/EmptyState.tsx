import { Inbox } from 'lucide-react'
import type { ReactNode } from 'react'

interface EmptyStateProps {
  title?: string
  message: string
  icon?: ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

export function EmptyState({
  title = 'No data found',
  message,
  icon,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center animate-fade-in">
      <div className="rounded-full bg-cream-100 p-6 mb-4">
        {icon || <Inbox className="h-12 w-12 text-warm-400" />}
      </div>

      <h3 className="text-lg font-serif font-semibold text-warm-900 mb-2">
        {title}
      </h3>

      <p className="text-warm-600 text-sm max-w-md mb-6">
        {message}
      </p>

      {action && (
        <button
          onClick={action.onClick}
          className="px-4 py-2 bg-warm-500 hover:bg-warm-600 text-white rounded-lg transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  )
}
