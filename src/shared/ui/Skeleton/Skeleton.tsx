import type { FC, HTMLAttributes } from "react"
import { cn } from "@/shared/lib/common"

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const Skeleton: FC<SkeletonProps> = ({ className, ...props }) => {
  return <div className={cn("animate-shimmer rounded-md", className)} {...props} />
}
