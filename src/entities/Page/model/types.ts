import { PartialBlock } from "@blocknote/core"

export interface Page {
  id: string
  title: string
  content: PartialBlock[]
}
