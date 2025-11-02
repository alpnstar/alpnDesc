"use client"
import { useCallback, useEffect, useState, type FC, type HTMLAttributes } from "react"
import { useParams } from "next/navigation"
import { useGetPageByIdQuery, useUpdatePageMutation } from "@/entities/Page/api/pageApi"
import { ToggleBtn } from "@/features/Sidebar"
import { Dropdown } from "@/shared/ui/Dropdown"

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Header: FC<HeaderProps> = () => {
  const params = useParams()
  const pageId = params.page as string

  const { data: page } = useGetPageByIdQuery(pageId, {
    skip: !pageId,
  })

  const [updatePage] = useUpdatePageMutation()
  const [title, setTitle] = useState("")

  useEffect(() => {
    if (page) {
      if (page.title === "New Page") {
        setTitle("")
      } else {
        setTitle(page.title)
      }
    }
  }, [page])

  const handleTitleBlur = useCallback(() => {
    if (!page) return
    const newTitle = title.trim() === "" ? "New Page" : title
    if (newTitle === page.title) {
      return
    }
    updatePage({ id: page.id, title: newTitle })
  }, [page, title, updatePage])

  return (
    <header className="flex items-center gap-4">
      <ToggleBtn />
      {page && (
        <div className="flex gap-3">
          <Dropdown trigger={<span className="cursor-pointer">{page.title}</span>}>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              placeholder="New Page"
              className="w-full bg-transparent p-1 outline-none"
              autoFocus
            />
          </Dropdown>
          <span className="flex items-center gap-1.5 text-[#a8a49c]">
            <svg fill="#a8a49c" viewBox="0 0 20 20" className="h-4 w-4">
              <path d="M6 5.95a4 4 0 1 1 8 0v1.433a2.426 2.426 0 0 1 2.025 2.392v5.4A2.425 2.425 0 0 1 13.6 17.6H6.4a2.425 2.425 0 0 1-2.425-2.425v-5.4c0-1.203.876-2.201 2.025-2.392zm6.75 1.4v-1.4a2.75 2.75 0 1 0-5.5 0v1.4zm-2.2 5.458a1.35 1.35 0 1 0-1.1 0v1.242a.55.55 0 0 0 1.1 0z"></path>
            </svg>
            Private
          </span>
        </div>
      )}
    </header>
  )
}
