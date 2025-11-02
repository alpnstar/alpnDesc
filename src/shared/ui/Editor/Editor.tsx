"use client"
import React, { FC } from "react"
import { PartialBlock } from "@blocknote/core"
import { BlockNoteView } from "@blocknote/mantine"
import { useCreateBlockNote } from "@blocknote/react"
import "@blocknote/mantine/style.css"
import "@blocknote/core/fonts/inter.css"

import "./styles.css"

interface IEditorProps {
  content: PartialBlock[]
  updateHandler: (content: PartialBlock[]) => void
}

export const Editor: FC<IEditorProps> = ({ content, updateHandler }) => {
  const editor = useCreateBlockNote({ initialContent: content })
  return (
    <BlockNoteView
      defaultValue={content as string[]}
      onChange={() => updateHandler(editor.document)}
      editor={editor}
    />
  )
}
