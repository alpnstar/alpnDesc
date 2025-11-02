"use client"
import React, { FC } from "react"
import { sidebarActions } from "@/features/Sidebar"
import { useAppDispatch } from "@/shared/lib/store/hooks"

export const HideBtn: FC = () => {
  const dispatch = useAppDispatch()
  const handler = () => {
    dispatch(sidebarActions.closeSidebar())
  }
  return (
    <div
      onClick={handler}
      className="hidden cursor-pointer rounded p-1 group-hover/aside:flex hover:bg-[#383838]"
    >
      <svg viewBox="0 0 20 20" fill="#a8a49c" width="20" height="20">
        <path d="M3.608 10.442a.625.625 0 0 1 0-.884l5.4-5.4a.625.625 0 0 1 .884.884L4.934 10l4.958 4.958a.625.625 0 1 1-.884.884z"></path>
        <path d="m14.508 4.158-5.4 5.4a.625.625 0 0 0 0 .884l5.4 5.4a.625.625 0 1 0 .884-.884L10.434 10l4.958-4.958a.625.625 0 1 0-.884-.884"></path>
      </svg>
    </div>
  )
}
