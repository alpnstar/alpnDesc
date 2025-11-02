import React, { FC } from "react"
import Image, { StaticImageData } from "next/image"

interface AvatarProps {
  src: string | StaticImageData
  alt: string
  className?: string
}

export const Avatar: FC<AvatarProps> = ({ src, alt, className }) => {
  return (
    <span className={`mr-2 h-[20px] w-[20px] flex-shrink-0 ${className || ""}`}>
      <Image className="h-full w-full rounded-[3px]" src={src} alt={alt} />
    </span>
  )
}
