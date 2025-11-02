import React, { FC } from "react"

interface UserNameProps {
  name: string
  className?: string
}

export const UserName: FC<UserNameProps> = ({ name, className }) => {
  return (
    <span className={`flex-grow overflow-hidden text-nowrap text-ellipsis ${className || ""}`}>
      {name}
    </span>
  )
}
