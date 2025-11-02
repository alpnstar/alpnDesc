"use client"
import React, { FC } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { Page } from "@/entities/Page"
import {
  useAddPageMutation,
  useDeletePageMutation,
  useLazyGetPageByIdQuery,
} from "@/entities/Page/api/pageApi"
import { RenameDropdown } from "@/features/RenamePage"
import { Dropdown, DropdownItem } from "@/shared/ui/Dropdown"

// --- Icons ---
const DuplicateIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path
      d="M19.5 16.5H19.51M19.5 16.5V4.5C19.5 3.67157 18.8284 3 18 3H6C5.17157 3 4.5 3.67157 4.5 4.5V16.5C4.5 17.3284 5.17157 18 6 18H18C18.8284 18 19.5 17.3284 19.5 16.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8.5 21H15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const RenameIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path
      d="M13.543 5.122L6.879 11.786C6.686 11.979 6.58 12.235 6.58 12.502V16.5H10.498C10.765 16.5 11.021 16.394 11.214 16.201L17.878 9.537C18.071 9.344 18.177 9.088 18.177 8.821C18.177 8.554 18.071 8.298 17.878 8.105L14.894 5.121C14.506 4.733 13.878 4.733 13.543 5.122Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6.5L16.5 11"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const DeleteIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
    <path
      d="M4.5 6.5H19.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 10.5V15.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.5 10.5V15.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.5 6.5L7.5 18.5C7.5 19.6046 8.39543 20.5 9.5 20.5H14.5C15.6046 20.5 16.5 19.6046 16.5 18.5L17.5 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.5 6.5V4.5C9.5 3.94772 9.94772 3.5 10.5 3.5H13.5C14.0523 3.5 14.5 3.94772 14.5 4.5V6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// --- Components ---

interface PagesItemProps {
  page: Page
}

const PagesItem: FC<PagesItemProps> = ({ page }) => {
  const params = useParams()
  const router = useRouter()
  const activePageId = params.page

  const [deletePage] = useDeletePageMutation()
  const [addPage] = useAddPageMutation()
  const [triggerGetPage] = useLazyGetPageByIdQuery()

  const handleDelete = () => {
    deletePage(page.id)
    if (activePageId === page.id) {
      router.push("/")
    }
  }

  const handleDuplicate = async () => {
    const { data: pageToDuplicate } = await triggerGetPage(page.id)
    if (pageToDuplicate) {
      const newPageData = {
        title: `${pageToDuplicate.title} (Copy)`,
        content: pageToDuplicate.content,
      }
      const res = await addPage(newPageData)
      if (res.data?.id) {
        router.push(`/page/${res.data.id}`)
      }
    }
  }

  return (
    <li
      className={`group/li flex items-center justify-between rounded px-2 py-1 text-[#9b9b9b] hover:bg-[#2c2c2c] ${page.id === activePageId ? "bg-[#2c2c2c]" : ""}`}
    >
      <Link href={"/page/" + page.id} className="flex flex-grow items-center gap-1.5">
        <span>
          <svg fill="#D3D3D3" viewBox="0 0 16 16" className="h-[16px] w-[16px]">
            <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
          </svg>
        </span>
        <span>{page.title}</span>
      </Link>
      <div
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <Dropdown
          trigger={
            <span className="hidden group-hover/li:inline-block">
              <svg fill="#D3D3D3" viewBox="0 0 16 16" className="h-[16px] w-[16px]">
                <path d="M3.2 6.725a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55m4.8 0a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55m4.8 0a1.275 1.275 0 1 0 0 2.55 1.275 1.275 0 0 0 0-2.55"></path>
              </svg>
            </span>
          }
        >
          <DropdownItem onClick={handleDuplicate}>
            <DuplicateIcon />
            <span>Duplicate</span>
          </DropdownItem>
          <RenameDropdown page={page}>
            <DropdownItem>
              <RenameIcon />
              <span>Rename</span>
            </DropdownItem>
          </RenameDropdown>
          <DropdownItem onClick={handleDelete}>
            <DeleteIcon />
            <span>Delete</span>
          </DropdownItem>
        </Dropdown>
      </div>
    </li>
  )
}

export const PagesList: FC<{ pages: Page[] }> = ({ pages }) => {
  const [addPage] = useAddPageMutation()
  const router = useRouter()
  const handler = async () => {
    const res = await addPage({ title: "New Page", content: "" })
    // @ts-expect-error - The `addPage` mutation returns a data shape that is not fully typed here.
    router.push(`/page/${res.data?.id}`)
  }
  return (
    <div>
      <div className="group/div flex cursor-pointer items-center justify-between rounded px-2 py-1 text-[#9b9b9b] hover:bg-[#2c2c2c]">
        <span>Pages</span>
        <span onClick={handler}>
          <svg
            fill="#9b9b9b"
            viewBox="0 0 16 16"
            className="hidden h-[16px] w-[16px] group-hover/div:inline-block"
          >
            <path d="M8 2.74a.66.66 0 0 1 .66.66v3.94h3.94a.66.66 0 0 1 0 1.32H8.66v3.94a.66.66 0 0 1-1.32 0V8.66H3.4a.66.66 0 0 1 0-1.32h3.94V3.4A.66.66 0 0 1 8 2.74"></path>
          </svg>
        </span>
      </div>
      <ul>
        {pages.map((page) => (
          <PagesItem key={page.id} page={page} />
        ))}
      </ul>
    </div>
  )
}
