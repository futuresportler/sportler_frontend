import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function PlayerPerformanceLoading() {
  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-10 w-[250px]" />
          <Skeleton className="h-5 w-[350px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students List Panel Loading */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <Skeleton className="h-6 w-[100px] mb-2" />
              <Skeleton className="h-4 w-[150px] mb-4" />
              <Skeleton className="h-10 w-full mb-2" />
              <div className="flex justify-between mt-2">
                <Skeleton className="h-8 w-[80px]" />
                <Skeleton className="h-8 w-[80px]" />
                <Skeleton className="h-8 w-[80px]" />
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                {Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div>
                          <Skeleton className="h-5 w-[120px] mb-1" />
                          <Skeleton className="h-4 w-[80px]" />
                        </div>
                      </div>
                      <Skeleton className="h-8 w-[50px]" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Details Panel Loading */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div>
                  <Skeleton className="h-8 w-[200px] mb-2" />
                  <Skeleton className="h-4 w-[300px]" />
                </div>
                <div className="flex space-x-2">
                  <Skeleton className="h-6 w-[80px]" />
                  <Skeleton className="h-6 w-[60px]" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-6">
                <Skeleton className="h-10 w-[300px]" />
              </div>

              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-[150px] mb-4" />
                  <div className="space-y-4">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex justify-between">
                            <Skeleton className="h-4 w-[100px]" />
                            <Skeleton className="h-4 w-[40px]" />
                          </div>
                          <Skeleton className="h-2 w-full" />
                        </div>
                      ))}
                  </div>
                </div>

                <div>
                  <Skeleton className="h-6 w-[180px] mb-4" />
                  <Skeleton className="h-[200px] w-full" />
                </div>

                <div>
                  <Skeleton className="h-6 w-[120px] mb-3" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-[80%] mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
