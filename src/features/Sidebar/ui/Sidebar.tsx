"use client"
import { FC, HTMLAttributes } from "react"
import { useGetPagesQuery } from "@/entities/Page/api/pageApi"
import { PagesList } from "@/features/Sidebar/ui/PagesList"
import { useAppSelector } from "@/shared/lib/store/hooks"
import { Skeleton } from "@/shared/ui/Skeleton"
import { Profile } from "@/widgets/Profile/ui"

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

const SidebarSkeleton = () => (
  <div className="px-2">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="flex items-center gap-1.5 py-2">
        <Skeleton className="h-4 w-4 rounded-sm" />
        <Skeleton className="h-4 w-32 rounded-sm" />
      </div>
    ))}
  </div>
)

export const Sidebar: FC<SidebarProps> = () => {
  const status = useAppSelector((state) => state.sidebar.status)
  const { data: pages, isLoading, error } = useGetPagesQuery()

  return (
    <aside
      className={`group/aside relative ${status ? "block w-[240px] px-2 py-1.5" : "w-[1px] hover:cursor-pointer"} h-[100vh] overflow-hidden bg-[#202020] text-sm text-nowrap transition-all`}
    >
      <div>
        <Profile />
        {isLoading && <SidebarSkeleton />}
        {error && <p className="px-2 text-red-500">Error loading pages</p>}
        {pages && <PagesList pages={pages || []} />}
      </div>
    </aside>
  )
}
