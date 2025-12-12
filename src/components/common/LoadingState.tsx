interface LoadingStateProps {
  message?: string
  size?: 'small' | 'medium' | 'large'
}

export function LoadingState({ message, size = 'medium' }: LoadingStateProps) {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  }

  return (
    <div className="flex flex-col items-center justify-center p-8 animate-fade-in">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-warm-200 border-t-warm-500`}
      />
      {message && (
        <p className="mt-4 text-warm-600 text-sm">{message}</p>
      )}
    </div>
  )
}

/**
 * Skeleton loading placeholder
 */
interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`animate-pulse bg-cream-200 rounded ${className}`}
        />
      ))}
    </>
  )
}

/**
 * Card skeleton for news/market cards
 */
export function CardSkeleton() {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl border border-warm-200 p-6 animate-fade-in">
      <div className="flex items-start gap-4">
        <Skeleton className="h-12 w-12 rounded-lg" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      </div>
    </div>
  )
}
