import React, { FC } from "react"
import { Avatar } from "@/entities/User/ui" // New import
import { HideBtn } from "@/features/Sidebar/ui/HideBtn"
import { Dropdown, DropdownItem } from "@/shared/ui/Dropdown"
import userImg from "../../../../public/unnamed.jpg"

export const Profile: FC = () => {
  return (
    <div className="group/div flex cursor-pointer items-center rounded px-2 py-1 hover:bg-[#2c2c2c]">
      <div className="shrink-0 grow">
        <Dropdown
          trigger={
            <div className="flex w-[144px] items-center overflow-hidden text-nowrap text-ellipsis group-hover/aside:w-[110px]">
              <Avatar src={userImg} alt="User Avatar" />
              <span className={`flex-grow overflow-hidden text-nowrap text-ellipsis`}>
                Daud Satiyadzhiev
              </span>
            </div>
          }
        >
          <DropdownItem>Profile</DropdownItem>
          <DropdownItem>
            <span className="text-red-500">Log out</span>
          </DropdownItem>
        </Dropdown>
      </div>
      <HideBtn />
      <div className="cursor-pointer rounded p-1 hover:bg-[#383838]">
        <svg viewBox="0 0 20 20" fill="#f0efed" className="h-5 w-5">
          <path d="m16.774 4.341-.59.589-1.109-1.11.596-.594a.784.784 0 0 1 1.103 0c.302.302.302.8 0 1.102zM8.65 12.462l6.816-6.813-1.11-1.11-6.822 6.808a1.1 1.1 0 0 0-.236.393l-.289.932c-.052.196.131.38.315.314l.932-.288a.9.9 0 0 0 .394-.236"></path>
          <path d="M4.375 6.25c0-1.036.84-1.875 1.875-1.875H11a.625.625 0 1 0 0-1.25H6.25A3.125 3.125 0 0 0 3.125 6.25v7.5c0 1.726 1.4 3.125 3.125 3.125h7.5c1.726 0 3.125-1.4 3.125-3.125V9a.625.625 0 1 0-1.25 0v4.75c0 1.036-.84 1.875-1.875 1.875h-7.5a1.875 1.875 0 0 1-1.875-1.875z"></path>
        </svg>
      </div>
    </div>
  )
}
