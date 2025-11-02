"use client"
import { FC, ReactNode, useCallback, useEffect, useState } from "react"
import { Page } from "@/entities/Page"
import { useUpdatePageMutation } from "@/entities/Page/api/pageApi"
import { Dropdown } from "@/shared/ui/Dropdown"

interface RenameDropdownProps {
  page: Page
  children: ReactNode // This will be the trigger
}

export const RenameDropdown: FC<RenameDropdownProps> = ({ page, children }) => {
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

  const handleSave = useCallback(() => {
    if (!page) return
    const newTitle = title.trim() === "" ? "New Page" : title
    if (newTitle === page.title) {
      return
    }
    updatePage({ id: page.id, title: newTitle })
  }, [page, title, updatePage])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur() // This will trigger the onBlur which calls handleSave
    }
  }

  return (
    <Dropdown trigger={children}>
      <div onMouseDown={(e) => e.stopPropagation()}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder="New Page"
          className="w-full bg-transparent p-1 outline-none"
          autoFocus
        />
      </div>
    </Dropdown>
  )
}
