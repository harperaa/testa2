"use client"

import * as React from "react"
import {
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconHelp,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconShieldCheck,
  IconSparkles,
  IconTargetArrow,
} from "@tabler/icons-react"

import { NavDocuments } from "@/app/dashboard/nav-documents"
import { NavMain } from "@/app/dashboard/nav-main"
import { NavSecondary } from "@/app/dashboard/nav-secondary"
import { NavUser } from "@/app/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { ChatMaxingIconColoured } from "@/components/logo"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { usePathname, useRouter } from "next/navigation"

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Log",
      url: "/dashboard/log",
      icon: IconListDetails,
    },
    {
      title: "Progress",
      url: "/dashboard/progress",
      icon: IconChartBar,
    },
    {
      title: "Pro insights",
      url: "/dashboard/payment-gated",
      icon: IconSparkles,
    },
  ],
  navAdmin: [
    {
      title: "Security Monitoring",
      url: "/dashboard/security",
      icon: IconShieldCheck,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "/dashboard/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Food library",
      url: "/dashboard/library",
      icon: IconDatabase,
    },
    {
      name: "Weekly reports",
      url: "/dashboard/reports",
      icon: IconReport,
    },
    {
      name: "Goal settings",
      url: "/dashboard/settings",
      icon: IconTargetArrow,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const isAdmin = useQuery(api.users.checkIsAdmin)
  const pathname = usePathname()
  const router = useRouter()

  const securitySummary = useQuery(
    api.security.getSecuritySummary,
    isAdmin ? {} : "skip"
  )

  const getBadgeVariant = () => {
    if (!securitySummary) return "secondary"
    if (securitySummary.criticalCount > 0) return "destructive"
    if (securitySummary.highCount > 0) return "destructive"
    if (securitySummary.mediumCount > 0) return "default"
    return "secondary"
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <ChatMaxingIconColoured className="!size-6" />
                <span className="text-base font-semibold">
                  {process.env.NEXT_PUBLIC_SITE_NAME || "Grok Fit"}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {isAdmin && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarMenu>
              {data.navAdmin.map((item) => {
                const isActive = pathname === item.url
                const isSecurityItem = item.url === "/dashboard/security"
                const unreadCount = securitySummary?.unreadCount ?? 0

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      isActive={isActive}
                      onClick={() => router.push(item.url)}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      {isSecurityItem && unreadCount > 0 && (
                        <Badge
                          variant={getBadgeVariant()}
                          className="ml-auto h-5 min-w-5 px-1.5 text-xs"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        )}
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
