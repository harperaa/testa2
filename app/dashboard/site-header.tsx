"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

function getPageTitle(pathname: string): string {
  if (pathname === "/dashboard") return "Dashboard"
  if (pathname.startsWith("/dashboard/log")) return "Log"
  if (pathname.startsWith("/dashboard/progress")) return "Progress"
  if (pathname.startsWith("/dashboard/payment-gated")) return "Pro insights"
  if (pathname.startsWith("/dashboard/settings")) return "Settings"
  if (pathname.startsWith("/dashboard/library")) return "Food library"
  if (pathname.startsWith("/dashboard/reports")) return "Weekly reports"
  if (pathname.startsWith("/dashboard/help")) return "Help"
  if (pathname.startsWith("/dashboard/search")) return "Search"
  if (pathname.startsWith("/dashboard/security")) return "Security Monitoring"
  return "Grok Fit"
}

export function SiteHeader() {
  const pathname = usePathname()
  const pageTitle = getPageTitle(pathname)

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{pageTitle}</h1>
      </div>
    </header>
  )
}
