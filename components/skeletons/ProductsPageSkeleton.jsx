import { Skeleton } from "@/components/ui/skeleton"

export default function ProductsPageSkeleton() {
  return (
    <div className="w-full">
      <div className="container mx-auto p-4">
        {/* Breadcrumb Skeleton */}
        <div className="flex gap-2 mb-8">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-24" />
        </div>

        {/* Category Slider Skeleton */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex-shrink-0 w-[160px] md:w-[200px]">
                <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-3">
                  <div className="flex justify-center">
                     <Skeleton className="h-24 w-24 rounded-full" />
                  </div>
                  <div className="flex justify-center">
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar Skeleton - Desktop only */}
          <div className="hidden lg:block col-span-3 space-y-8">
            {/* Filter Section 1 */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
            {/* Filter Section 2 */}
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Product Results Skeleton */}
          <div className="col-span-12 lg:col-span-9">
            {/* Header/Controls */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
               <Skeleton className="h-6 w-48" />
               <div className="flex gap-2">
                 <Skeleton className="h-10 w-32" />
                 <Skeleton className="h-10 w-24" />
               </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="border rounded-lg p-4 space-y-4 bg-white">
                  {/* Image */}
                  <div className="aspect-square flex items-center justify-center bg-neutral-50 rounded-lg">
                    <Skeleton className="h-40 w-40" />
                  </div>
                  {/* Content */}
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-2/3" />
                  </div>
                  {/* Footer/Price */}
                  <div className="pt-2 border-t flex justify-between items-center">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
