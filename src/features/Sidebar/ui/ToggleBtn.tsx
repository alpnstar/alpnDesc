"use client"
import React, { FC } from "react"
import { sidebarActions } from "@/features/Sidebar"
import { useAppDispatch, useAppSelector } from "@/shared/lib/store/hooks"

export const ToggleBtn: FC = () => {
  const status = useAppSelector((state) => state.sidebar.status)
  const dispatch = useAppDispatch()
  const handler = () => {
    dispatch(sidebarActions.openSidebar())
  }
  return !status ? (
    <div
      onClick={handler}
      className="mb-1 flex cursor-pointer flex-col gap-1.5 [&_span]:h-[1px] [&_span]:w-[22px] [&_span]:bg-white"
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  ) : (
    ""
  )
}
