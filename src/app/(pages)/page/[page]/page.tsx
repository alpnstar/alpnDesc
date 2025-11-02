"use client"
import { FC, useCallback, useEffect, useState } from "react"
import { PartialBlock } from "@blocknote/core"
import { useParams } from "next/navigation"
import { useGetPageByIdQuery, useUpdatePageMutation } from "@/entities/Page/api/pageApi"
import { Editor } from "@/shared/ui/Editor/Editor"
import { Header } from "@/widgets/Header"

const Page: FC = () => {
  const params = useParams()
  const { data: page } = useGetPageByIdQuery(params.page as string)
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

  const handleContentUpdate = (content: PartialBlock[]) => {
    updatePage({ id: page?.id as string, content: content })
  }

  const handleTitleBlur = useCallback(() => {
    if (!page) return

    const newTitle = title.trim() === "" ? "New Page" : title

    if (newTitle === page.title) {
      return
    }

    updatePage({ id: page.id, title: newTitle })
  }, [page, title, updatePage])

  return (
    <>
      <Header />
      <div className="m-auto mt-[80px] h-[300px] w-[760px]">
        {page ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={handleTitleBlur}
              placeholder={page.title}
              className="mb-2 ml-13.5 w-full bg-transparent text-[40px] font-bold outline-none"
            />
            <Editor content={page.content} updateHandler={handleContentUpdate} />
          </>
        ) : (
          <div>Page not found</div>
        )}
      </div>
    </>
  )
}

export default Page
