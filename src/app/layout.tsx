"use client"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Provider } from "react-redux"
import { Sidebar } from "@/features/Sidebar"
import { store } from "@/shared/lib/store/store"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <div className={`${geistSans.variable} ${geistMono.variable} flex antialiased`}>
            <Sidebar />
            <main className="w-full p-3">{children}</main>
          </div>
        </Provider>
      </body>
    </html>
  )
}
