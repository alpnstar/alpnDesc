import type { FC, HTMLAttributes } from "react"
import { cn } from "@/shared/lib/common"

interface UserCardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const UserCard: FC<UserCardProps> = (props) => {
  const { className, children, ...otherProps } = props

  return (
    <div className={cn("", {}, [className])} {...otherProps}>
      {children}
    </div>
  )
}
