import type { FC, HTMLAttributes } from "react"
import { cn } from "@/shared/lib/common"

interface PageCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const PageCard: FC<PageCardProps> = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <div className={cn("", {}, [className])} {...otherProps}>
      {children}
    </div>
  )
}
