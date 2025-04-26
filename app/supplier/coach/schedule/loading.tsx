export default function Loading() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Calendar Skeleton */}
      <div className="border rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b bg-muted/5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="h-6 w-40 bg-muted animate-pulse rounded mb-2"></div>
              <div className="h-4 w-60 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
              <div className="h-10 w-48 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </div>

        {/* Month View Skeleton */}
        <div className="grid grid-cols-7 gap-0">
          {/* Day headers */}
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="text-center py-2 bg-muted/10 border border-muted/20">
              <div className="h-5 w-8 bg-muted animate-pulse rounded mx-auto"></div>
            </div>
          ))}

          {/* Calendar days */}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className="h-32 border border-muted/20 p-1 relative">
              <div className="absolute top-1 right-1 w-6 h-6 bg-muted animate-pulse rounded-full"></div>

              {/* Random session placeholders */}
              {Math.random() > 0.7 && (
                <div className="mt-6 space-y-1">
                  <div className="h-5 w-full bg-muted animate-pulse rounded"></div>
                  {Math.random() > 0.5 && <div className="h-5 w-full bg-muted animate-pulse rounded"></div>}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Incoming Bookings Skeleton */}
      <div className="border rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <div className="h-6 w-40 bg-muted animate-pulse rounded mb-2"></div>
          <div className="h-4 w-60 bg-muted animate-pulse rounded"></div>
        </div>
        <div className="p-6">
          <div className="h-10 w-full bg-muted animate-pulse rounded mb-6"></div>

          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="mb-4 border rounded-lg">
              <div className="p-4 border-b">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-muted animate-pulse rounded-full mr-3"></div>
                    <div>
                      <div className="h-5 w-32 bg-muted animate-pulse rounded mb-1"></div>
                      <div className="h-4 w-20 bg-muted animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
                </div>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="h-4 w-4 bg-muted animate-pulse rounded mr-2 mt-0.5"></div>
                    <div>
                      <div className="h-4 w-40 bg-muted animate-pulse rounded mb-1"></div>
                      <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-4 w-4 bg-muted animate-pulse rounded mr-2"></div>
                    <div className="h-4 w-48 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              </div>
              <div className="p-4 flex justify-between">
                <div className="h-9 w-24 bg-muted animate-pulse rounded"></div>
                <div className="h-9 w-24 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
