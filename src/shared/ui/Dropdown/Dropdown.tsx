"use client"
import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import { createPortal } from "react-dom"

type DropdownStatus = "closed" | "opening" | "open" | "closing"

interface DropdownContextType {
  close: () => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

interface DropdownProps {
  trigger: ReactNode
  children: ReactNode
}

function useCoords(triggerRef: React.RefObject<HTMLDivElement>, status: DropdownStatus) {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 })

  useEffect(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      })
    }
  }, [triggerRef, status]) // Recalculate if trigger or status changes

  return coords
}

export const Dropdown: FC<DropdownProps> = ({ trigger, children }) => {
  const [status, setStatus] = useState<DropdownStatus>("closed")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)
  const coords = useCoords(triggerRef, status)

  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  const close = useCallback(() => {
    if (status === "open") {
      setStatus("closing")
    }
  }, [status])

  const handleTriggerClick = () => {
    if (status === "closed") {
      setStatus("opening")
    } else if (status === "open") {
      setStatus("closing")
    }
  }

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        close()
      }
    },
    [close]
  )

  useEffect(() => {
    if (status === "opening") {
      const timer = setTimeout(() => setStatus("open"), 180) // duration of fade-in
      return () => clearTimeout(timer)
    }
    if (status === "closing") {
      const timer = setTimeout(() => setStatus("closed"), 150) // duration of fade-out
      return () => clearTimeout(timer)
    }
  }, [status])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [handleClickOutside])

  const animationClass = () => {
    switch (status) {
      case "opening":
        return "animate-fade-in-scale"
      case "closing":
        return "animate-fade-out-scale"
      default:
        return ""
    }
  }

  return (
    <DropdownContext.Provider value={{ close }}>
      <div onClick={handleTriggerClick} ref={triggerRef}>
        {trigger}
      </div>
      {status !== "closed" &&
        mounted &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${coords.top + 8}px`,
              left: `${coords.left}px`,
              minWidth: `${coords.width}px`,
            }}
            className={`z-10 w-56 rounded-md border border-[#4d4b48] bg-[#2a2826] p-1.5 text-sm text-[#a8a49c] ${animationClass()}`}
          >
            {children}
          </div>,
          document.body
        )}
    </DropdownContext.Provider>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onClick?: () => void
}

export const DropdownItem: FC<DropdownItemProps> = ({ children, onClick }) => {
  const context = useContext(DropdownContext)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
    if (context) {
      context.close()
    }
  }

  return (
    <div
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-2 rounded-md p-1.5 hover:bg-[#4d4b48] hover:text-white"
    >
      {children}
    </div>
  )
}
