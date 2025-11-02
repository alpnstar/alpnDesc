"use client"
import { FC, HTMLAttributes } from "react"
// import { cn } from '@/shared/lib/common';
import { useGetPagesQuery } from "@/entities/Page/api/pageApi"
import { PagesList } from "@/features/Sidebar/ui/PagesList" // Keep this import
import { useAppSelector } from "@/shared/lib/store/hooks"
import { Profile } from "@/widgets/Profile/ui"

interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Sidebar: FC<SidebarProps> = () => {
  const status = useAppSelector((state) => state.sidebar.status)
  const { data: pages, isLoading, error } = useGetPagesQuery()

  return (
    <aside
      className={`group/aside relative ${status ? "block w-[240px] px-2 py-1.5" : "w-[1px] hover:cursor-pointer"} h-[100vh] overflow-hidden bg-[#202020] text-sm text-nowrap transition-all`}
    >
      <div>
        <Profile /> {/* Changed from <User /> */}
        {isLoading && <p className="px-2 text-[#9b9b9b]">Loading pages...</p>}
        {error && <p className="px-2 text-red-500">Error loading pages</p>}
        {pages && <PagesList pages={pages || []} />}
      </div>
    </aside>
  )
}
