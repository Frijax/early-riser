import type { ReactNode } from 'react'
import { LoadingState } from './LoadingState'
import { ErrorState } from './ErrorState'
import { EmptyState } from './EmptyState'

interface AsyncBoundaryProps<T> {
  children: ReactNode
  isLoading: boolean
  error: Error | string | null
  data?: T | T[] | null
  isEmpty?: boolean
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
  emptyComponent?: ReactNode
  emptyMessage?: string
  onRetry?: () => void
}

export function AsyncBoundary<T>({
  children,
  isLoading,
  error,
  data,
  isEmpty,
  loadingComponent,
  errorComponent,
  emptyComponent,
  emptyMessage = 'No data available',
  onRetry,
}: AsyncBoundaryProps<T>) {
  // Loading state
  if (isLoading) {
    return <>{loadingComponent || <LoadingState />}</>
  }

  // Error state
  if (error) {
    return (
      <>
        {errorComponent || (
          <ErrorState
            error={error}
            onRetry={onRetry}
          />
        )}
      </>
    )
  }

  // Empty state
  const isDataEmpty =
    isEmpty ??
    (data === null ||
      data === undefined ||
      (Array.isArray(data) && data.length === 0))

  if (isDataEmpty) {
    return (
      <>
        {emptyComponent || (
          <EmptyState
            message={emptyMessage}
            action={onRetry ? { label: 'Reload', onClick: onRetry } : undefined}
          />
        )}
      </>
    )
  }

  // Success state - render children
  return <>{children}</>
}
